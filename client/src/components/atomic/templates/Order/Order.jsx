import { OrderForm } from "../../organisms/OrderForm/OrderForm";
import { OrderElementsList } from "../OrderElementsList/OrderElementsList";
import { useState, useEffect } from "react";
import './Order.css'

export const Order = () => {
    const [total, setTotal] = useState(0);
    const [deliver, setDeliver] = useState(0)
    useEffect(() => {
        const fetchMinPrice = async () => {
            try {
                const response = await fetch('http://13.60.53.226/api/deliveryPrice/getDeliveryPrice');
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    setDeliver(data.deliveryPrice || '');
                } else {
                    console.error("Не вдалося отримати мінімальну ціну: " + response.statusText);
                }
            } catch (error) {
                console.error("Помилка мережі при отриманні мінімальної ціни: " + error.message);
            }
        };

        fetchMinPrice();
    }, []);
    const handleTotalChange = (newTotal) => {
        setTotal(newTotal);
    };

    return <div className="order-block">
        <div className="order-block-form"><OrderForm /></div>
        <div className="order-block-data">
            <h2>Дані замовлення</h2>
            <OrderElementsList onTotalChange={handleTotalChange} />
            <div style={{ borderTop: "none" }} className="total-price">
                <div className="total-price-text">Доставка:</div>
                <div className="total-price-cost">{deliver} ₴</div>
            </div>
            <div style={{ borderTop: "none" }} className="total-price">
                <div className="total-price-text">Підсумок замовлення:</div>
                <div className="total-price-cost">{total + deliver} ₴</div>
            </div>
        </div>
    </div>
}