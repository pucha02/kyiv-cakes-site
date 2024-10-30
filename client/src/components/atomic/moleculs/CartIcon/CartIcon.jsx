import { CartCount } from "../../atoms/header/Cart/CartHeaderIcon/CartCount";
import { CartImage } from "../../atoms/header/Cart/CartHeaderIcon/CartImg";
import { useState, useEffect } from "react";
import './CartIcon.css'

export const CartIcon = ({ onClick }) => {
    const [count, setCount] = useState(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        return cart.reduce((total, item) => total + (item.quantity || 1), 0);
    });

    useEffect(() => {
        const updateCount = () => {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            setCount(cart.reduce((total, item) => total + (item.quantity || 1), 0));
        };

        window.addEventListener("storage", updateCount);

        return () => {
            window.removeEventListener("storage", updateCount);
        };
    }, []);

    return (
        <div onClick={onClick} className="cart-icon-block">
            <CartCount count={count} />
            <CartImage />
        </div>
    );
};