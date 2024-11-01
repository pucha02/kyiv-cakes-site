import { CartCount } from "../../atoms/header/Cart/CartHeaderIcon/CartCount";
import { CartImage } from "../../atoms/header/Cart/CartHeaderIcon/CartImg";
import { useState, useEffect } from "react";
import './CartIcon.css'

export const CartIcon = ({ onClick }) => {
    const [count, setCount] = useState(() => {
        const cartData = localStorage.getItem("cart");
        const cart = cartData ? JSON.parse(cartData) : [];
        return cart.reduce((total, item) => total + (item.quantity || 1), 0);
    });

    useEffect(() => {
        const updateCount = () => {
            const cartData = localStorage.getItem("cart");
            const cart = cartData ? JSON.parse(cartData) : [];
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
