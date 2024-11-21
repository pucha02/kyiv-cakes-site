import {RegistrationFormFirstNameInputAtom} from "../../atoms/ClientRegistrationForm/FirstNameInput"

export const FirstNameRegistrationMolecule = ({ handleChange, userData, validationErrors }) => {
    return (
        <>
            <RegistrationFormFirstNameInputAtom userData={userData} handleChange={handleChange} />
            {validationErrors.firstname && <p>{validationErrors.firstname}</p>}
        </>
    )
}