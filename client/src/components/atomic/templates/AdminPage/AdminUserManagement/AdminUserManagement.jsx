import { useState, useEffect } from "react";
import ClientRegistrationForm from "../../../organisms/ClientRegistrationForm/ClientRegistrationForm";
import './AdminUserManagement.css';

export const AdminUserManagement = () => {
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        const fetchUsersData = async () => {
            try {
                const response = await fetch('http://13.60.53.226/api/auth/get-all-users');
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data.users);
                } else {
                    setMessage("Не вдалося отримати користувачів: " + response.statusText);
                }
            } catch (error) {
                setMessage("Помилка мережі при отриманні користувачів: " + error.message);
            }
        };

        fetchUsersData();
    }, []);

    const handleEditUser = (userId) => {
        const user = users.find((u) => u._id === userId);
        setEditingUser(user);
    };

    const handleDeleteUser = async (userId) => {
        try {
            const response = await fetch(`http://13.60.53.226/api/auth/delete-user/${userId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setUsers(users.filter((user) => user._id !== userId));
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
            const response = await fetch(`http://13.60.53.226/api/auth/update-user/${editingUser._id}`, {
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

    return (
        <div className="admin-user-management">
            <ClientRegistrationForm />

            {message && <p className="message">{message}</p>}

            <div className="users-list">
                <h2>Список користувачів</h2>
                <table className="users-table">
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
                                    <button className="edit-btn" onClick={() => handleEditUser(user._id)}>Редагувати</button>
                                    <button className="delete-btn" onClick={() => handleDeleteUser(user._id)}>Видалити</button>
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
                    <button className="save-btn" onClick={handleSaveUser}>Зберегти</button>
                    <button className="cancel-btn" onClick={() => setEditingUser(null)}>Скасувати</button>
                </div>
            )}

            {message && <p className="message">{message}</p>}
        </div>
    );
};
