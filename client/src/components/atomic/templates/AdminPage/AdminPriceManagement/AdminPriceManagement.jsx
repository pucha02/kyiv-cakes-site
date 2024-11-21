import { useState } from "react";
import { useEffect } from "react";
import './AdminPriceManagement.css'

export const AdminPriceManagement = () => {
    const [minPrice, setMinPrice] = useState('');
    const [message, setMessage] = useState(''); 

    useEffect(() => {
        const fetchMinPrice = async () => {
            try {
                const response = await fetch('http://13.60.53.226/api/minPrice/getMinPrice');
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

        fetchMinPrice();
    }, []);

    const updateMinPrice = async () => {
        if (!minPrice) {
            setMessage("Мінімальна ціна не може бути порожньою.");
            return;
        }

        try {
            const response = await fetch(`http://13.60.53.226/api/minPrice/putMinPrice?minPrice=${minPrice}`, {
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
    return (
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
            {message && <p className="message">{message}</p>}
        </div>
    )
}