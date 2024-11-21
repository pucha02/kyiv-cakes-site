import './ClientLoginForm.css';
import { useState } from "react";
import { PhoneLoginMolecule } from "../../moleculs/ClientLoginForm/PhoneMolecule";
import { PasswordLoginMolecule } from "../../moleculs/ClientLoginForm/PasswordMolecule";
import { LoginFormSubmitButtonAtom } from "../../atoms/ClientLoginForm/SubmitButton";
import { validateFields } from "../../../../utils/ValidateForm";
import { handleChangeInput } from "../../../../utils/handleChangeInput";
import { useNavigate } from "react-router-dom";
import { HeaderLogo } from '../../atoms/header/Logo/HeaderLogo';
import Logo from '../../../../resources/productImage/logo.webp'
import './ClientLoginForm.css'

const ClientLoginForm = () => {
    const navigate = useNavigate(); 
    const [userData, setUserData] = useState({
        number_phone: '+380',
        password: ''
    });

    const [validationErrors, setValidationErrors] = useState({});

    const handleSubmitLoginUser = async (e) => {
        e.preventDefault();
        const errors = validateFields(userData);
        if (errors.length > 0) {
            setValidationErrors(errors);
            return;
        }
        try {
            const response = await fetch('http://13.60.53.226/api/auth/login-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            const data = await response.json();
            if (response.status === 400) {
                alert(data.message);
            }
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userid', data.id);
                alert('Ви успішно увійшли до системи');
                navigate('/kyivcakes');
            } else {
                console.log('Помилка входу');
            }
        } catch (error) {
            console.log('Помилка входу. Перевірте дані.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-logo"><HeaderLogo src={Logo}/></div>
                <h2 className="login-title">Ласкаво просимо до магазину <br /> Kyiv Cakes</h2>
                <form onSubmit={handleSubmitLoginUser}>
                    <PhoneLoginMolecule 
                        userData={userData} 
                        handleChange={(e) => handleChangeInput(e, setUserData, userData)} 
                        validationErrors={validationErrors}
                    />
                    <PasswordLoginMolecule 
                        userData={userData} 
                        handleChange={(e) => handleChangeInput(e, setUserData, userData)} 
                        validationErrors={validationErrors} 
                    />
                    <LoginFormSubmitButtonAtom />
                </form>
            </div>
        </div>
    );
};

export default ClientLoginForm;
