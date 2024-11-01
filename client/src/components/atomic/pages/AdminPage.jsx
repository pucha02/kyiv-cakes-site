import { useState } from 'react';
import './AdmonPage.css'

export const AdminPage = () => {
    const [message, setMessage] = useState(''); // Стейт для сообщения

    const updateProducts = async () => {
        try {
            const response = await fetch('http://13.60.53.226/api/getProducts', {
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

    return (
        <div className="admin-page">
        <button type="button" className="update-button" onClick={updateProducts}>
            Оновити дані товарів
        </button>
        {message && <p className='message'>{message}</p>}
    </div>
    );
};
