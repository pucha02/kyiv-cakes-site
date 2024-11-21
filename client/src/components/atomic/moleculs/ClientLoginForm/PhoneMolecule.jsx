import { LoginFormPhoneInputAtom } from "../../atoms/ClientLoginForm/PhoneInput"

export const PhoneLoginMolecule = ({ handleChange, userData, validationErrors }) => {
    return (
        <>
            <LoginFormPhoneInputAtom userData={userData} handleChange={handleChange} />
            {validationErrors.number_phone && <p>{validationErrors.number_phone}</p>}
        </>
    )
}