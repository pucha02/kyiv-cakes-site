import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fetch from 'node-fetch';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import minPriceRoutes from './routes/minPriceRoutes.js'
import productRoutes from './routes/productRoutes.js'
import marqueeRoutes from './routes/marqueeRoutes.js'

import Product from './models/Product.js';
// Импорт необходимых модулей
import {
    graphqlMutationAddingItem,
    graphqlMutationCreateDocument,
    graphqlGetContact,
    upsertContragent,
    createContact,
    graphqlGetProducts,
    createAdress
} from './requests.js';
import { createOrder } from './createOrder.js';
import { headers } from './headers.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb+srv://kyivcakes1:yfmCfjFhGuNhwRJ9@cluster0.09vxu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
// Налаштування транспорту для nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // можна використовувати інший сервіс (наприклад, Yahoo, Outlook)
    auth: {
        user: 'kyivcakes1@gmail.com', // ваша електронна пошта
        pass: 'rpwo gswb qddw eycn'
    }
});

app.post('/api/mongo-orders', async (req, res) => {
    try {
        console.log('Отримані замовлення: ', req.body);
        const { order, contact, billingInfo } = req.body;

        // Перевірка наявності елементів замовлення
        if (!order || order.length === 0) {
            return res.status(400).json({ message: "Відсутні елементи замовлення" });
        }

        const items = order.map(item => ({
            itemName: item.name || 'Не вказано',
            quantity: item.quantity || 1,
            price: item.cost || 0,
            catalogItemId: item.catalogItemId || 'Не вказано',
            sku: item.id,
            deliveryDate: `${item.deliveryDate}:00`
        }));
        graphqlGetContact.variables.phoneEq = req.body.phone;
        upsertContragent.variables.formalName = req.body.establishment;
        let contragentId;

        await fetch("https://api.keruj.com/api/graphql", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(graphqlGetContact),
        })
            .then((response) => response.json())
            .then(async (data) => {
                if (data.data.getContact != null) {
                    const { ownerId, ownerSchema } = data.data.getContact.node;
                    
                    contragentId = ownerId;
                    graphqlMutationCreateDocument.variables.contragentId = ownerId;
                    graphqlMutationCreateDocument.variables.resultAt = `${req.body.deliveryDate}:00`;
                    createAdress.variables = {
                        contragentId: ownerId,
                        city: req.body.city,
                        streetLine1: req.body.address
                    };
                    const addressResponse = await fetch("https://api.keruj.com/api/graphql", {
                        method: "POST",
                        headers: headers,
                        body: JSON.stringify(createAdress),
                    });
                    
                    const addressData = await addressResponse.json();
                    console.log("Відповідь від сервера:", JSON.stringify(addressData.data.createAddress, null, 2));
                
                    if (!addressData || !addressData.data || !addressData.data.createAddress) {
                        throw new Error("Відповідь не містить даних про створену адресу");
                    }
                
                    const addressId = addressData.data.createAddress.id;
                    graphqlMutationCreateDocument.variables.addressId = addressId;
                    return createOrder(headers, graphqlMutationCreateDocument, graphqlMutationAddingItem, items);
                } else {

                    try {
                        const response = await fetch("https://api.keruj.com/api/graphql", {
                            method: "POST",
                            headers: headers,
                            body: JSON.stringify(upsertContragent),
                        });
                        const data = await response.json();
                        
                        const contragentId = data?.data?.upsertContragent?.id;
                    
                        if (!contragentId) {
                            throw new Error("Не вдалося отримати ID контрагента");
                        }
                    
                        createContact.variables = {
                            ownerId: contragentId,
                            ownerSchema: "CONTRAGENTS",
                            type: "PERSON",
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            phone: req.body.phone,
                            email: req.body.email
                        };
                        
                        createAdress.variables = {
                            contragentId: contragentId,
                            city: req.body.city,
                            streetLine1: req.body.address
                        };
                    
                        // Создание адреса
                        const addressResponse = await fetch("https://api.keruj.com/api/graphql", {
                            method: "POST",
                            headers: headers,
                            body: JSON.stringify(createAdress),
                        });
                        
                        const addressData = await addressResponse.json();
                        console.log("Відповідь від сервера:", JSON.stringify(addressData.data.createAddress, null, 2));
                    
                        if (!addressData || !addressData.data || !addressData.data.createAddress) {
                            throw new Error("Відповідь не містить даних про створену адресу");
                        }
                    
                        const addressId = addressData.data.createAddress.id;
                        graphqlMutationCreateDocument.variables.addressId = addressId;
                    
                        // Создание контакта
                        const contactResponse = await fetch("https://api.keruj.com/api/graphql", {
                            method: "POST",
                            headers: headers,
                            body: JSON.stringify(createContact),
                        });
                        
                        const contactData = await contactResponse.json();
                        console.log("Відповідь від сервера:", JSON.stringify(contactData, null, 2));
                    
                        if (!contactData || !contactData.data || !contactData.data.createContact) {
                            throw new Error("Відповідь не містить даних про створений контакт");
                        }
                    
                        console.log("Створений контакт:", contactData.data.createContact);
                    
                        // Установка оставшихся переменных и создание заказа
                        graphqlMutationCreateDocument.variables.contragentId = contragentId;
                        graphqlMutationCreateDocument.variables.resultAt = `${req.body.deliveryDate}:00`;
                    
                        await createOrder(headers, graphqlMutationCreateDocument, graphqlMutationAddingItem, items);
                    
                    } catch (error) {
                        console.error("Ошибка:", error);
                    }
                    
                }
            })
            .then(async () => {
                // Формування повідомлення для клієнта
                const messageText = `
Дякуємо за ваше замовлення!
Деталі замовлення:
${items.map(item => `- ${item.itemName}, Кількість: ${item.quantity}, Ціна: ${item.price}, Дата доставки: ${`${req.body.deliveryDate}:00`}`).join('\n')}
Загальна сума: ${items.reduce((total, item) => total + item.price * item.quantity, 0)}
                `;

                // Надсилання email клієнту
                await transporter.sendMail({
                    from: 'kyivcakes1@gmail.com',
                    to: req.body.email,  // email клієнта
                    subject: 'Ваше замовлення прийнято',
                    text: messageText
                })
                    .then(() => console.log("Сообщение успешно отправлено"))
                    .catch(error => console.error("Ошибка отправки сообщения:", error));
                res.status(200).json({ message: "Замовлення успішно оброблено та дані надіслані в CRM" });
            })
            .catch((error) => {
                console.error("Помилка при надсиланні запиту:", error);
                res.status(500).json({ message: "Помилка при обробці даних" });
            });

    } catch (error) {
        console.error("Помилка при обробці замовлення:", error);
        res.status(500).json({ message: "Помилка при обробці даних" });
    }
});

app.post('/api/getProductsFromCrm', async (req, res) => {
    try {
        // Получить существующие продукты из базы данных
        const existingProducts = await Product.find({});
        const existingProductMap = new Map(
            existingProducts.map((product) => [product.id, product.type])
        );

        let hasNextPage = true;
        let after = null;
        const newProducts = []; // Массив для временного хранения новых продуктов

        while (hasNextPage) {
            const response = await fetch("https://api.keruj.com/api/graphql", {
                method: "POST",
                headers: headers,
                body: JSON.stringify(graphqlGetProducts(after)),
            });

            const data = await response.json();
            const products = data.data.listItems.edges;

            // Обрабатываем новые продукты
            products.forEach((el) => {
                const existingType = existingProductMap.get(el.node.id) || null;

                newProducts.push({
                    id: el.node.id,
                    name: el.node.name,
                    description: el.node.notes,
                    basePrice: el.node.basePrice,
                    category: el.node.category ? el.node.category.title : null,
                    coverImage: el.node.coverImage ? el.node.coverImage.publicUrl : null,
                    type: existingType, // Сохраняем старое значение type, если оно было
                });
            });

            // Проверяем, есть ли следующая страница
            after = data.data.listItems.pageInfo.endCursor;
            hasNextPage = !!after;
        }

        // Удаляем старые продукты
        await Product.deleteMany({});
        console.log('Old products deleted.');

        // Сохраняем новые продукты в MongoDB
        await Promise.all(newProducts.map(async (productData) => {
            const product = new Product(productData);
            await product.save();
            console.log('Product saved:', product);
        }));

        res.status(200).json({ message: 'Products successfully updated' });
    } catch (error) {
        console.error("Error processing products:", error);
        res.status(500).json({ error: 'Failed to update products' });
    }
});


app.use('/api/products', productRoutes)
app.use('/api/auth', authRoutes);
app.use('/api/minPrice', minPriceRoutes)
app.use('/api/marquee', marqueeRoutes)

app.listen(5000, () => {
    console.log('Сервер запущен на http://localhost:5000');
});
