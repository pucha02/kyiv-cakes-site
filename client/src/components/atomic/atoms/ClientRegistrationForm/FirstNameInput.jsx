export const RegistrationFormFirstNameInputAtom = ({handleChange, userData}) => {
    return (
        <input
            type="firstname"
            name="firstname"
            placeholder="Ім'я"
            value={userData.firstname}
            onChange={handleChange}
        />
    )
}