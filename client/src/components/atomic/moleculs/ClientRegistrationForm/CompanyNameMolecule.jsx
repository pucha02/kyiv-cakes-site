import { RegistrationFormCompanyNameInputAtom } from "../../atoms/ClientRegistrationForm/CompanyNameInput"

export const CompanyNameRegistrationMolecule = ({ handleChange, userData, validationErrors }) => {
    return (
        <>
            <RegistrationFormCompanyNameInputAtom userData={userData} handleChange={handleChange} />
            {/* {<p>{validationErrors.firstname}</p>} */}
        </>
    )
}