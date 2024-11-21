import { InputOrderForm } from "../../atoms/orderForm/Input/InputOrderForm"
import './InputWithLabelOrder.css'

export const InputWithLabelOrder = ({ label, type, name, placeholder, value, onChange, onFocus, disabled=null  }) => {
    return (
        <div className="input-with-label">
            <p>{label}</p>
            <InputOrderForm type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} onFocus={onFocus} disabled={disabled}/>
        </div>
    )
}