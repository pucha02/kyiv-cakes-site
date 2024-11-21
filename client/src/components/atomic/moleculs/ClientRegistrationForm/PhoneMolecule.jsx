import {RegistrationFormPhoneInputAtom} from "../../atoms/ClientRegistrationForm/PhoneInput"

export const PhoneRegistrationMolecule = ({ handleChange, userData, validationErrors }) => {
    return (
        <>
            <RegistrationFormPhoneInputAtom userData={userData} handleChange={handleChange} />
            {validationErrors.number_phone && <p>{validationErrors.number_phone}</p>}
        </>
    )
}