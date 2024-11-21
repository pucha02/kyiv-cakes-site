import { useState, useEffect, useMemo } from "react";
import { ProductImage } from "../../../atoms/product/Image/ProductImage";
import { ProductName } from "../../../atoms/product/Name/ProductName";
import { ProductCost } from "../../../atoms/product/Cost/ProductCost";
import './AdminCategoryManagement.css'

export const AdminCategoryManagement = () => {
    const [message, setMessage] = useState(''); // State for status messages

    const [productList, setProductList] = useState([]); // State to store fetched products


    // Fetch products from the server on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://13.60.53.226/api/products/getProducts'); // Fetch from your API
                const data = await response.json();
                console.log(data)
                setProductList(data); // Set the fetched data
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleProductTypeToggle = async (productId, newType) => {
        try {
            const response = await fetch(`http://13.60.53.226/api/products/updateType/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type: newType }),
            });

            if (response.ok) {
                setProductList((prev) =>
                    prev.map((product) =>
                        product._id === productId ? { ...product, type: newType } : product
                    )
                );
                setMessage('Тип товару успішно оновлено.');
            } else {
                setMessage('Помилка при оновленні типу товару: ' + response.statusText);
            }
        } catch (error) {
            setMessage('Помилка мережі при оновленні типу товару: ' + error.message);
        }
    };


    const categorizedData = useMemo(() => {
        return productList.reduce((acc, item) => {
            if (!acc[item.category]) {
                acc[item.category] = { order: item.categoryOrder, products: [] };
            }
            acc[item.category].products.push(item);
            return acc;
        }, {});
    }, [productList]);

    const sortedCategories = useMemo(() => {
        return Object.entries(categorizedData).sort((a, b) => a[1].order - b[1].order);
    }, [categorizedData]);

    const handleMoveCategory = async (category, direction) => {
        const currentCategoryIndex = sortedCategories.findIndex(([key]) => key === category);
        const targetCategoryIndex = direction === 'up' ? currentCategoryIndex - 1 : currentCategoryIndex + 1;

        // Проверка выхода за пределы массива
        if (targetCategoryIndex < 0 || targetCategoryIndex >= sortedCategories.length) return;

        // Получение текущей и целевой категории
        const [currentCategory, currentData] = sortedCategories[currentCategoryIndex];
        const [targetCategory, targetData] = sortedCategories[targetCategoryIndex];

        try {
            // Отправка запроса на сервер для обновления порядка категорий
            await fetch('http://13.60.53.226/api/products/update-category-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    currentCategory,
                    targetCategory,
                    currentOrder: currentData.order,
                    targetOrder: targetData.order,
                }),
            });

            // После успешного обновления обновляем данные на клиенте
            setProductList((prev) => {
                const updatedList = [...prev];
                updatedList.forEach((item) => {
                    if (item.category === currentCategory) item.categoryOrder = targetData.order;
                    if (item.category === targetCategory) item.categoryOrder = currentData.order;
                });
                return updatedList;
            });
        } catch (error) {
            console.error('Ошибка при обновлении порядка категорий:', error);
        }
    };

    const renderItemsByCategory = (data) => {
        return data.map(([category, info]) => (
            <div key={category} className="admin-category">
                <div className="admin-category-header">
                    <h2 className="admin-category-title">{category}</h2>
                    <div className="admin-category-controls">
                        <button onClick={() => handleMoveCategory(category, 'up')}>Вверх</button>
                        <button onClick={() => handleMoveCategory(category, 'down')}>Вниз</button>
                    </div>
                </div>
                <ul className="admin-product-list">
                    {info.products.map((item, i) => (
                        <li className="admin-product-item" key={i}>
                            <div className="admin-product-card">
                                <ProductImage src={item.coverImage} alt={item.name} />
                                <ProductName name={item.name} />
                                <ProductCost cost={item.basePrice} />
                                <div className="admin-checkbox-container">
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={item.type === 'new'}
                                            onChange={() =>
                                                handleProductTypeToggle(item._id, item.type === 'new' ? '' : 'new')
                                            }
                                        />
                                        Новий
                                    </label>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        ));
    };
    const elements = useMemo(() => renderItemsByCategory(sortedCategories), [sortedCategories]);
    return (
        <>
            <div className="admin-category-management">
                {elements}
                {message && <p className="admin-message">{message}</p>}
            </div>
        </>
    )
}