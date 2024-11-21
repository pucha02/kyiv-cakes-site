export const LoginFormPasswordInputAtom = ({handleChange, userData}) => {
    return (
        <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={userData.password}
            onChange={handleChange}
        />
    )
}