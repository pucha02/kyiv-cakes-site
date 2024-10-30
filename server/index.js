import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fetch from 'node-fetch';

// Импорт необходимых модулей
import {
    graphqlMutationAddingItem,
    graphqlMutationCreateDocument,
    graphqlGetContact,
    upsertContragent,
    createContact
} from './requests.js';
import { createOrder } from './createOrder.js';
import { headers } from './headers.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/mongo-orders', async (req, res) => {
    try {
        console.log('Полученные заказы: ', req.body.data);
        const { order, contact, billingInfo } = req.body;

        // Проверка наличия элементов заказа
        if (!lineItems || lineItems.length === 0) {
            return res.status(400).json({ message: "Отсутствуют элементы заказа" });
        }

        const items = order.map(item => ({
            itemName: item.name || 'Не указано',
            quantity: item.quantity || 1,
            price: item.cost || 0,
            catalogItemId: item.catalogItemId || 'Не указано',
            sku: item.id
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
                    console.log("ownerId:", ownerId);
                    console.log("ownerSchema:", ownerSchema);

                    contragentId = ownerId;
                    graphqlMutationCreateDocument.variables.contragentId = ownerId;
                    return createOrder(headers, graphqlMutationCreateDocument, graphqlMutationAddingItem, items);
                } else {
                    // Если контакт не найден, создаем контрагента и контакт
                    await fetch("https://api.keruj.com/api/graphql", {
                        method: "POST",
                        headers: headers,
                        body: JSON.stringify(upsertContragent),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            contragentId = data?.data?.upsertContragent?.id;
                            console.log(contragentId);
                            if (contragentId) {
                                createContact.variables = {
                                    ownerId: contragentId,
                                    ownerSchema: "CONTRAGENTS",
                                    firstName: req.body.firstName,
                                    phone: req.body.phone,
                                };
                                console.log(createContact.variables);

                                fetch("https://api.keruj.com/api/graphql", {
                                    method: "POST",
                                    headers: headers,
                                    body: JSON.stringify(createContact),
                                })
                                    .then(response => {
                                        if (!response.ok) {
                                            throw new Error("Ошибка сети: " + response.status);
                                        }
                                        return response.json(); // Преобразуем ответ в JSON
                                    })
                                    .then(data => {
                                        // Выводим полный ответ от сервера для диагностики
                                        console.log("Ответ от сервера:", JSON.stringify(data, null, 2));

                                        // Проверяем, есть ли в ответе данные о созданном контакте
                                        if (data && data.data && data.data.createContact) {
                                            console.log("Созданный контакт:", data.data.createContact);
                                        } else {
                                            throw new Error("Ответ не содержит данных о созданном контакте");
                                        }
                                    })
                                    .catch(error => {
                                        console.error("Ошибка при создании контакта:", error);
                                    });
                            } else {
                                throw new Error("Не удалось получить ID контрагента");
                            }

                        })
                        .then(() => {
                            graphqlMutationCreateDocument.variables.contragentId = contragentId;
                            return createOrder(headers, graphqlMutationCreateDocument, graphqlMutationAddingItem, items);
                        });
                }
            })
            .then(() => {
                res.status(200).json({ message: "Заказ успешно обработан и данные отправлены в CRM" });
            })
            .catch((error) => {
                console.error("Ошибка при отправке запроса:", error);
                res.status(500).json({ message: "Ошибка при обработке данных" });
            });

    } catch (error) {
        console.error("Ошибка при обработке заказа:", error);
        res.status(500).json({ message: "Ошибка при обработке данных" });
    }
});

app.listen(5000, () => {
    console.log('Сервер запущен на http://localhost:5000');
});
