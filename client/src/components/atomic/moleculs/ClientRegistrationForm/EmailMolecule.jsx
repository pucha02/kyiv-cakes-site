import { RegistrationFormEmailInputAtom } from "../../atoms/ClientRegistrationForm/EmailInput"

export const EmailRegistrationMolecule = ({ handleChange, userData, validationErrors }) => {
    return (
        <>
            <RegistrationFormEmailInputAtom userData={userData} handleChange={handleChange} />
            {validationErrors.email && <p>{validationErrors.email}</p>}
            
        </>
    )
}