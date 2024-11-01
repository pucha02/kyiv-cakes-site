import './InputOrderForm.css';

export const InputOrderForm = ({type, name, placeholder, value, onChange, onFocus}) => {
    return <input className="input-order-form" type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} onFocus={onFocus} required/>;
};
