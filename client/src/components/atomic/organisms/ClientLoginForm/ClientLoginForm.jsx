import { useState } from "react";
import { PhoneLoginMolecule } from "../../moleculs/ClientLoginForm/PhoneMolecule";
import { PasswordLoginMolecule } from "../../moleculs/ClientLoginForm/PasswordMolecule";
import { LoginFormSubmitButtonAtom } from "../../atoms/ClientLoginForm/SubmitButton";
import { validateFields } from "../../../../utils/ValidateForm";
import { handleChangeInput } from "../../../../utils/handleChangeInput";


import { useNavigate } from "react-router-dom";

const ClientLoginForm = () => {
    const navigate = useNavigate(); 
    const [userData, setUserData] = useState({
        number_phone: '',
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
            const response = await fetch('http://localhost:5000/api/auth/login-user', {
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
                navigate('/kyivcakes'); // Перенаправление после успешного входа
            } else {
                console.log('Помилка входу');
            }
        } catch (error) {
            console.log('Помилка входу. Перевірте дані.');
        }
    };

    return (
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
    );
};

export default ClientLoginForm;
