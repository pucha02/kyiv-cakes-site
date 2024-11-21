import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Импорт navigate
import { CartCloseButton } from "../../atoms/header/Cart/CartModal/CartCloseButton";
import { CartOverlay } from "../../atoms/header/Cart/CartModal/CartOverlay";
import { CartElementsList } from "../CartElementsList/CartElementsList";
import "./CartModal.css";

export const CartModal = ({ isOpen, setIsOpen }) => {
    const [total, setTotal] = useState(0);
    const [isWarningOpen, setIsWarningOpen] = useState(false);
    const [isTimeWarningOpen, setIsTimeWarningOpen] = useState(false);

    const [minPrice, setMinPrice] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate(); 

    const WORK_HOURS_START = 9; 
    const WORK_HOURS_END = 20; 

    const isWithinWorkHours = () => {
        const now = new Date();
        const currentHour = now.getHours();
        return currentHour >= WORK_HOURS_START && currentHour < WORK_HOURS_END;
    };

    useEffect(() => {
        const fetchMinPrice = async () => {
            try {
                const response = await fetch("http://13.60.53.226/api/minPrice/getMinPrice");
                if (response.ok) {
                    const data = await response.json();
                    setMinPrice(data.minPrice || "");
                } else {
                    setMessage("Не вдалося отримати мінімальну ціну: " + response.statusText);
                }
            } catch (error) {
                setMessage("Помилка мережі при отриманні мінімальної ціни: " + error.message);
            }
        };

        fetchMinPrice();
    }, []);

    const cartData = localStorage.getItem("cart");
    const cartItems = cartData ? JSON.parse(cartData) : [];

    const toggleCart = () => {
        setIsOpen(false);
    };

    const handleTotalChange = (newTotal) => {
        setTotal(newTotal);
    };

    const handleOrderClick = () => {
        if (total < minPrice) {
            setIsWarningOpen(true);
        } else if (!isWithinWorkHours()) {
            setIsTimeWarningOpen(true);
        } else {
            navigate("/create-order");
        }
    };

    const closeWarningModal = () => {
        setIsWarningOpen(false);
    };

    const closeTimeWarningModal = () => {
        setIsTimeWarningOpen(false);
        navigate("/create-order");
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
                                    <div className="cart-body">
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
                                    <button onClick={handleOrderClick} className="create-order-button">
                                        Оформити замовлення
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                    <CartOverlay onClick={toggleCart} />
                </>
            )}

            {isWarningOpen && (
                <div className="warning-modal">
                    <div className="warning-modal-content">
                        <p>
                            Мінімальна сума замовлення становить {minPrice} ₴. Додайте товари до
                            кошика, щоб оформити замовлення.
                        </p>
                        <button onClick={closeWarningModal} className="close-warning-button">
                            Закрити
                        </button>
                    </div>
                </div>
            )}

            {isTimeWarningOpen && (
                <div className="warning-modal">
                    <div className="warning-modal-content">
                        <p>
                            Час прийому замовлень з {WORK_HOURS_START}:00 до {WORK_HOURS_END}:00. Якщо
                            ви оформите замовлення зараз, можлива відсутність деяких позицій.
                        </p>
                        <button onClick={closeTimeWarningModal} className="close-warning-button">
                            Закрити
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
