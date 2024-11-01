import { useState, useEffect } from "react";
import { NameCartProducts } from "../../atoms/header/Cart/CartItemElements/Name/NameCartProducts";
import { PriceCartProducts } from "../../atoms/header/Cart/CartItemElements/Price/PriceCartProducts";
import { CartProductImage } from "../../atoms/header/Cart/CartItemElements/Image/CartProductImage";
import { QuantityCartProducts } from "../../atoms/header/Cart/CartItemElements/Quantity/QuantityCartProducts";
import ProdImg from '../../../../resources/productImage/tart.webp';
 import './OrderrResultItem.css';

export const OrderResultItem = ({ item }) => {
    const [count, setCount] = useState(item.quantity);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const updatedCart = cart.map(cartItem =>
            cartItem.id === item.id ? { ...cartItem, quantity: count } : cartItem
        );

        localStorage.setItem("cart", JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("storage"));

    }, [count, item.id]);

    return (
        <div className="cart-item-block">
            <div className="cart-item-image">
                <CartProductImage src={item.src || item.image || ProdImg} />
            </div>
            <div className="cart-item-description">
                <div className="cart-item-name-price">
                    <NameCartProducts name={item.name} />
                    <PriceCartProducts price={item.cost} className={'price-order-product'}/>
                </div>
                <QuantityCartProducts qty={item.quantity} />
            </div>
        </div>
    );
};
