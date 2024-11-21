import { useState } from "react";
import { useEffect } from "react";
import './AdminDeliveryPriceManagement.css'

export const AdminDeliveryPriceManagement = () => {
    const [deliveryPrice, setDeliveryPrice] = useState('');
    const [message, setMessage] = useState(''); 

    useEffect(() => {
        const fetchMinPrice = async () => {
            try {
                const response = await fetch('http://13.60.53.226/api/deliveryPrice/getDeliveryPrice');
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    setDeliveryPrice(data.deliveryPrice || '');
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
        if (!deliveryPrice) {
            setMessage("Мінімальна ціна не може бути порожньою.");
            return;
        }

        try {
            const response = await fetch(`http://13.60.53.226/api/deliveryPrice/putDeliveryPrice?deliveryPrice=${deliveryPrice}`, {
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
                value={deliveryPrice}
                onChange={(e) => setDeliveryPrice(e.target.value)}
                placeholder="Введіть ціну доставки"
            />
            <button type="button" onClick={updateMinPrice}>
                Оновити ціну доставки
            </button>
            {message && <p className="message">{message}</p>}
        </div>
    )
}