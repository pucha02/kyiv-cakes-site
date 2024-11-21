import { RegistrationFormPasswordInputAtom } from "../../atoms/ClientRegistrationForm/PasswordInput"

export const PasswordRegistrationMolecule = ({ handleChange, userData, validationErrors }) => {
    return (
        <>
            <RegistrationFormPasswordInputAtom userData={userData} handleChange={handleChange} />
            {validationErrors.password && <p>{validationErrors.password}</p>}
        </>
    )
}