import { useState } from "react";
import { PhoneRegistrationMolecule } from "../../moleculs/ClientRegistrationForm/PhoneMolecule";
import { FirstNameRegistrationMolecule } from "../../moleculs/ClientRegistrationForm/FirstNameMolecule";
import { LastNameRegistrationMolecule } from "../../moleculs/ClientRegistrationForm/LastNameMolecule";
import { PasswordRegistrationMolecule } from "../../moleculs/ClientRegistrationForm/PasswordMolecule";
import { EmailRegistrationMolecule } from "../../moleculs/ClientRegistrationForm/EmailMolecule";
import { CompanyNameRegistrationMolecule } from "../../moleculs/ClientRegistrationForm/CompanyNameMolecule";
import { RegistrationFormSubmitButtonAtom } from "../../atoms/ClientRegistrationForm/SubmitButton";
import { validateFields } from "../../../../utils/ValidateForm";
import { handleChangeInput } from "../../../../utils/handleChangeInput";

const ClientRegistrationForm = () => {
    const [userData, setUserData] = useState({
        number_phone: '',
        firstname: '',
        lastname: '',
        password: '',
        companyname: ''
    });
    const [validationErrors, setValidationErrors] = useState({});

    const handleSubmitRegistrationUser = async (e) => {
        e.preventDefault();
        const errors = validateFields(userData);

        setValidationErrors(errors);

        if (Object.keys(errors).length > 0) {
            console.log('Ошибки валидации, регистрация отменена', errors);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/register-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.status === 400) {
                alert('Користувач з таким номером телефону вже існує');
            }
            else if (response.status === 201) {
                alert('Реєстрація пройшла успішно');
            } else {
                throw new Error('Помилка під час реєстрації');
            }
        } catch (error) {
            console.log('Помилка під час реєстрації');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmitRegistrationUser}>
                <CompanyNameRegistrationMolecule userData={userData} handleChange={(e) => handleChangeInput(e, setUserData, userData)} validationErrors={validationErrors}/>
                <PhoneRegistrationMolecule userData={userData} handleChange={(e) => handleChangeInput(e, setUserData, userData)} validationErrors={validationErrors} />
                <FirstNameRegistrationMolecule userData={userData} handleChange={(e) => handleChangeInput(e, setUserData, userData)} validationErrors={validationErrors} />
                <LastNameRegistrationMolecule userData={userData} handleChange={(e) => handleChangeInput(e, setUserData, userData)} validationErrors={validationErrors} />
                <PasswordRegistrationMolecule userData={userData} handleChange={(e) => handleChangeInput(e, setUserData, userData)} validationErrors={validationErrors} />
                <RegistrationFormSubmitButtonAtom />
            </form>
        </>
    )
}

export default ClientRegistrationForm;