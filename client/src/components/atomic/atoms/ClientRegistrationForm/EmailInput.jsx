export const RegistrationFormEmailInputAtom = ({handleChange, userData}) => {
    return (
        <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
        />
    )
}