import { OrderForm } from "../../organisms/OrderForm/OrderForm";
import './Order.css'

export const Order = () => {
    return <div className="order-block">
        <div className="order-block-form"><OrderForm/></div>
        <div className="order-block-data">Дані замовлення</div>
    </div>
}