import { useState } from "react";
import { CartCloseButton } from "../../atoms/header/Cart/CartModal/CartCloseButton";
import { CartOverlay } from "../../atoms/header/Cart/CartModal/CartOverlay";
import { CartElementsList } from "../CartElementsList/CartElementsList";
import { Link } from "react-router-dom";
import "./CartModal.css";

export const CartModal = ({ isOpen, setIsOpen }) => {
    const [total, setTotal] = useState(0);
    const cartData = localStorage.getItem("cart");
    const cartItems = cartData ? JSON.parse(cartData) : [];

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
                            
                            {cartItems.length === 0 ? (
                                <div>Кошик порожній</div>
                            ) : (
                                <>
                                    <div>
                                        <div className="cart-head">
                                            <h2>Ваш кошик</h2>
                                            <span>(позицій: {cartItems.length})</span>
                                        </div>
                                        <CartElementsList onTotalChange={handleTotalChange} />
                                        <div className="total-price">
                                            <div className="total-price-text">Підсумок замовлення:</div>
                                            <div className="total-price-cost">{total} ₴</div>
                                        </div>
                                    </div>
                                    <Link to={'/create-order'}>
                                        <button className="create-order-button">Оформити замовлення</button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                    <CartOverlay onClick={toggleCart} />
                </>
            )}
        </>
    );
};

