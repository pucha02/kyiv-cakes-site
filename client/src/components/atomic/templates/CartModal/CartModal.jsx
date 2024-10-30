import { useState } from "react";
import { CartCloseButton } from "../../atoms/header/Cart/CartModal/CartCloseButton";
import { CartOverlay } from "../../atoms/header/Cart/CartModal/CartOverlay";
import { CartElementsList } from "../CartElementsList/CartElementsList";
import { Link } from "react-router-dom";
import "./CartModal.css";

export const CartModal = ({ isOpen, setIsOpen }) => {
    const [total, setTotal] = useState(0);
    const cartItems = JSON.parse(localStorage.getItem("cart"))

    const toggleCart = () => {
        setIsOpen(false);
    };

    const handleTotalChange = (newTotal) => {
        setTotal(newTotal);
    };

    return (
        <>
            {isOpen && (
                <>
                    <div className="cart-modal open">
                        <div className="cart-modal-content">
                            <CartCloseButton onClick={toggleCart} />
                            <h2>Ваша корзина</h2>
                            {cartItems.length === 0 ? <div>Кошик порожній</div> : <>
                                <CartElementsList onTotalChange={handleTotalChange} />
                                <div className="total-price"><div className="total-price-text">Підсумок замовлення:</div> <div className="total-price-cost">{total} грн</div></div>

                                <Link to={'/create-order'}>
                                    <button className="create-order-button">Оформити замовлення</button>
                                </Link>
                            </>}
                        </div>

                    </div>
                    <CartOverlay onClick={toggleCart} />
                </>
            )}
        </>
    );
};
