export const RegistrationFormCompanyNameInputAtom = ({handleChange, userData}) => {
    return (
        <input
            type="companyname"
            name="companyname"
            placeholder="Назва компанії"
            value={userData.companyname}
            onChange={handleChange}
        />
    )
}