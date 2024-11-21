import './InputOrderForm.css';

export const InputOrderForm = ({type, name, placeholder, value, onChange, onFocus, disabled=null}) => {
    return <input className="input-order-form" type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} onFocus={onFocus} disabled={disabled} required/>;
};
