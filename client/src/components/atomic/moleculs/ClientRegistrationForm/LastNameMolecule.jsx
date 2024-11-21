import {RegistrationFormLastNameInputAtom} from "../../atoms/ClientRegistrationForm/LastNameInput"

export const LastNameRegistrationMolecule = ({ handleChange, userData, validationErrors }) => {
    return (
        <>
            <RegistrationFormLastNameInputAtom userData={userData} handleChange={handleChange} />
            {validationErrors.lastname && <p>{validationErrors.lastname}</p>}
        </>
    )
}