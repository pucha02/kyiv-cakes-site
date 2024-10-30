import { InputOrderForm } from "../../atoms/orderForm/Input/InputOrderForm"
import './InputWithLabelOrder.css'

export const InputWithLabelOrder = ({ label, type, name, placeholder, value, onChange }) => {
    return (
        <div className="input-with-label">
            <label>{label}</label>
            <InputOrderForm type={type} name={name} placeholder={placeholder} value={value} onChange={onChange}/>
        </div>
    )
}