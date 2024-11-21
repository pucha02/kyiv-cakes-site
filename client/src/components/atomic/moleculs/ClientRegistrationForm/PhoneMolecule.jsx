import {RegistrationFormPhoneInputAtom} from "../../atoms/ClientRegistrationForm/PhoneInput"

export const PhoneRegistrationMolecule = ({ handleChange, userData, validationErrors, onFocus }) => {
    return (
        <>
            <RegistrationFormPhoneInputAtom userData={userData} handleChange={handleChange} onFocus={onFocus} />
            {validationErrors.number_phone && <p>{validationErrors.number_phone}</p>}
        </>
    )
}