import { useState, useEffect } from "react";
import { RemoveCartElementButton } from "../../atoms/header/Cart/CartItemElements/RemoveButton/RemoveButton";
import { NameCartProducts } from "../../atoms/header/Cart/CartItemElements/Name/NameCartProducts";
import { QuantityCartProducts } from "../../atoms/header/Cart/CartItemElements/Quantity/QuantityCartProducts";
import { PriceCartProducts } from "../../atoms/header/Cart/CartItemElements/Price/PriceCartProducts";
import { ProductQuantitySelector } from "../../moleculs/QuantitySelector/QuantitySelector";
import { CartProductImage } from "../../atoms/header/Cart/CartItemElements/Image/CartProductImage";
import ProdImg from '../../../../resources/productImage/tart.jpg';
import './CartItem.css';

export const CartItem = ({ item, onItemRemove, updateTotal }) => {
    const [count, setCount] = useState(item.quantity);

    const handleRemove = () => {
        onItemRemove(item.name);
        window.dispatchEvent(new Event("storage"));
    };

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        console.log(cart)
        const updatedCart = cart.map(cartItem => 
            cartItem.id === item.id ? { ...cartItem, quantity: count } : cartItem
        );

        localStorage.setItem("cart", JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("storage"));
        updateTotal(updatedCart);
    }, [count, item.id, updateTotal]);

    return (
        <div className="cart-item-block">
            <div className="cart-item-image">
                <CartProductImage src={item.image || item.src || ProdImg} />
            </div>
            <div className="cart-item-description">
                <NameCartProducts name={item.name} />
                <PriceCartProducts price={item.cost * count} className={'price-cart-product'} />
                <RemoveCartElementButton onRemove={handleRemove} />
                <ProductQuantitySelector count={count} setCount={setCount} updateTotal={updateTotal} />
            </div>
        </div>
    );
};
