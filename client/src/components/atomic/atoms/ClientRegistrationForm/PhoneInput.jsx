export const RegistrationFormPhoneInputAtom = ({ handleChange, userData }) => {
    const handlePhoneChange = (e) => {
        let value = e.target.value;

        // Если пользователь пытается удалить "+380", возвращаем его обратно
        if (!value.startsWith("+380")) {
            value = "+380";
        }

        // Передаем измененное значение в функцию handleChange
        handleChange({
            target: { name: "number_phone", value },
        });
    };

    return (
        <input
            type="text"
            name="number_phone"
            placeholder="Номер телефона"
            value={userData.number_phone}
            onChange={handlePhoneChange}
            className="form-input"
        />
    );
};
