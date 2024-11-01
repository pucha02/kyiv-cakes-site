import { useState, useEffect } from "react";
import { CartItem } from "../../organisms/CartItem/CartItem";
import './CartElementsList.css'

export const CartElementsList = ({ onTotalChange }) => {
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

    const removeItem = (itemName) => {
        const updatedCart = cartItems.filter(item => item.name !== itemName);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        updateTotal(updatedCart);
    };

    // Обновление totalPrice при изменении cartItems
    useEffect(() => {
        updateTotal(cartItems);
    }, [cartItems]);

    return (
        <div className="product-list-cart">
            {cartItems.map((item) => (
                <CartItem
                    key={item.id}
                    item={item}
                    onItemRemove={removeItem}
                    updateTotal={updateTotal}
                />
            ))}
            
        </div>
    );
};
