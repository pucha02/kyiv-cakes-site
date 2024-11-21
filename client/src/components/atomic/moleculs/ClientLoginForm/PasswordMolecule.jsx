import { LoginFormPasswordInputAtom } from "../../atoms/ClientLoginForm/PasswordInput"

export const PasswordLoginMolecule = ({ handleChange, userData, validationErrors }) => {
    return (
        <>
            <LoginFormPasswordInputAtom userData={userData} handleChange={handleChange} />
            {validationErrors.password && <p>{validationErrors.password}</p>}
        </>
    )
}