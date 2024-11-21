import { useState, useEffect } from 'react';
import { useMemo } from 'react';
import { ProductName } from "../atoms/product/Name/ProductName";
import { ProductCost } from "../atoms/product/Cost/ProductCost";
import { ProductImage } from '../atoms/product/Image/ProductImage';
import ClientRegistrationForm from '../organisms/ClientRegistrationForm/ClientRegistrationForm';
import './AdminPage.css';
import { ProductItem } from '../organisms/ProductItem/ProductItem';

export const AdminPage = () => {
    const [message, setMessage] = useState(''); // State for status messages
    const [minPrice, setMinPrice] = useState(''); // State for minPrice
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [productList, setProductList] = useState([]); // State to store fetched products
    const [newContent, setNewContent] = useState('');

    // Fetch products from the server on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products/getProducts'); // Fetch from your API
                const data = await response.json();
                console.log(data)
                setProductList(data); // Set the fetched data
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };

        fetchProducts();
    }, []);

    // Fetch the current minPrice when the component mounts
    useEffect(() => {
        const fetchMinPrice = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/minPrice/getMinPrice');
                if (response.ok) {
                    const data = await response.json();
                    setMinPrice(data.minPrice || '');
                } else {
                    setMessage("Не вдалося отримати мінімальну ціну: " + response.statusText);
                }
            } catch (error) {
                setMessage("Помилка мережі при отриманні мінімальної ціни: " + error.message);
            }
        };
        const fetchUsersData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/auth/get-all-users');
                if (response.ok) {
                    const data = await response.json();
                    console.log(data.users)
                    setUsers(data.users); // Сохраняем данные пользователей
                } else {
                    setMessage("Не вдалося отримати користувачів: " + response.statusText);
                }
            } catch (error) {
                setMessage("Помилка мережі при отриманні користувачів: " + error.message);
            }
        };

        fetchUsersData()
        fetchMinPrice();
    }, []);

    const handleEditUser = (userId) => {
        const user = users.find((u) => u._id === userId);
        setEditingUser(user);
    };

    const categorizedData = useMemo(() => (
        productList.reduce((acc, item) => {
            if (!acc[item.category]) acc[item.category] = [];
            acc[item.category].push(item);
            return acc;
        }, {})
    ), [productList]);

    const updateMinPrice = async () => {
        if (!minPrice) {
            setMessage("Мінімальна ціна не може бути порожньою.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/minPrice/putMinPrice?minPrice=${minPrice}`, {
                method: 'PUT',
            });

            if (response.ok) {
                setMessage("Мінімальну ціну успішно оновлено.");
            } else {
                setMessage("Помилка при оновленні мінімальної ціни: " + response.statusText);
            }
        } catch (error) {
            setMessage("Помилка мережі при оновленні мінімальної ціни: " + error.message);
        }
    };

    const updateProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/getProductsFromCrm', {
                method: 'POST',
            });

            if (response.ok) {
                setMessage("Оновлення товарів завершено успішно.");
            } else {
                setMessage("Помилка при оновленні товарів: " + response.statusText);
            }
        } catch (error) {
            setMessage("Помилка мережі при оновленні товарів: " + error.message);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/auth/delete-user/${userId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setUsers(users.filter((user) => user._id !== userId)); // Удаляем пользователя из состояния
                setMessage('Користувача успішно видалено.');
            } else {
                setMessage('Не вдалося видалити користувача: ' + response.statusText);
            }
        } catch (error) {
            setMessage('Помилка мережі при видаленні користувача: ' + error.message);
        }
    };


    const handleSaveUser = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/auth/update-user/${editingUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editingUser),
            });

            if (response.ok) {
                setUsers(users.map((user) => (user._id === editingUser._id ? editingUser : user)));
                setEditingUser(null);
                setMessage('Користувача успішно оновлено.');
            } else {
                setMessage('Не вдалося оновити користувача: ' + response.statusText);
            }
        } catch (error) {
            setMessage('Помилка мережі при оновленні користувача: ' + error.message);
        }
    };

    const handleProductTypeToggle = async (productId, newType) => {
        try {
            const response = await fetch(`http://localhost:5000/api/products/updateType/${productId}`, {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/marquee/updateContent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: newContent }),
            });

            if (response.ok) {
                alert('Контент успешно обновлен');
                setNewContent('');
            } else {
                alert('Ошибка при обновлении контента');
            }
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };


    const renderItemsByCategory = (data) => {
        return Object.keys(data).map((category, idx) => (
            <div key={idx} id={category} className="category-group">
                <h2 className="category-title">{category}</h2>
                <ul className="product-list">

                    {data[category].map((item, i) => (
                        <li className="product-element" key={i}>
                            <div className="product-card">
                                <ProductImage src={item.coverImage} alt={item.name} />
                                <ProductName name={item.name} />
                                <ProductCost cost={item.basePrice} />
                                <div className="checkbox-container">
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={item.type === 'new'}
                                            onChange={() => handleProductTypeToggle(item._id, item.type === 'new' ? '' : 'new')}
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

    const elements = useMemo(() => renderItemsByCategory(categorizedData), [categorizedData]);
    return (
        <div className="admin-page">
            <div>
                {elements}
            </div>
            <button type="button" className="update-button" onClick={updateProducts}>
                Оновити дані товарів
            </button>

            <div className="min-price-container">
                <label htmlFor="minPrice">Мінімальна ціна:</label>
                <input
                    id="minPrice"
                    type="text"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="Введіть мінімальну ціну"
                />
                <button type="button" onClick={updateMinPrice}>
                    Оновити мінімальну ціну
                </button>
            </div>

            <ClientRegistrationForm />

            {message && <p className="message">{message}</p>}

            <div className="users-list">
                <h2>Список користувачів</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Ім'я</th>
                            <th>Прізвище</th>
                            <th>Телефон</th>
                            <th>Назва компанії</th>
                            <th>Дії</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>{user.number_phone}</td>
                                <td>{user.companyname}</td>
                                <td>
                                    <button onClick={() => handleEditUser(user._id)}>Редагувати</button>
                                    <button onClick={() => handleDeleteUser(user._id)}>Видалити</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {editingUser && (
                <div className="edit-user-form">
                    <h3>Редагувати користувача</h3>
                    <input
                        type="text"
                        placeholder="Ім'я"
                        value={editingUser.firstname}
                        onChange={(e) => setEditingUser({ ...editingUser, firstname: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Прізвище"
                        value={editingUser.lastname}
                        onChange={(e) => setEditingUser({ ...editingUser, lastname: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Телефон"
                        value={editingUser.number_phone}
                        onChange={(e) => setEditingUser({ ...editingUser, number_phone: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Назва компанії"
                        value={editingUser.companyname}
                        onChange={(e) => setEditingUser({ ...editingUser, companyname: e.target.value })}
                    />
                    <button onClick={handleSaveUser}>Зберегти</button>
                    <button onClick={() => setEditingUser(null)}>Скасувати</button>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <label>
                    Новий текст стрічки
                    <input
                        type="text"
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                    />
                </label>
                <button type="submit">Оновити</button>
            </form>

        </div>
    );
};
