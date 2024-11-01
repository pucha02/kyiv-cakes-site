import { useState, useEffect } from "react";
import { OrderResultItem } from "../../organisms/OrderrResultItem/OrderrResultItem";
import './OrderElementList.css'

export const OrderElementsList = ({ onTotalChange }) => {
    const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
    const [totalPrice, setTotalPrice] = useState(() => {
        const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
        return initialCart.reduce((acc, item) => acc + item.cost * item.quantity, 0);
    });

    const updateTotal = (cart) => {
        const total = cart.reduce((acc, item) => acc + item.cost * item.quantity, 0);
        setTotalPrice(total);
        localStorage.setItem("totalPrice", JSON.stringify(total));
        onTotalChange(total);
    };
    // Обновление totalPrice при изменении cartItems
    useEffect(() => {
        updateTotal(cartItems);
    }, [cartItems]);

    return (
        <div className="product-list-order">
            {cartItems.map((item) => (
                <OrderResultItem
                    key={item.id}
                    item={item}
                />
            ))}

        </div>
    );
};
