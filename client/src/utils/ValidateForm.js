export const validateFields = (userData) => {
    let errors = {};

    Object.keys(userData).forEach((key) => {
        switch (key) {
            case 'number_phone':
                const phoneRegex = /^\+[0-9]{10,15}$/;
                if (!phoneRegex.test(userData[key])) {
                    errors[key] = 'Номер телефону повинен містити лише цифри (10-15 символів)';
                }
                break;

            case 'firstname':
                if (userData[key].trim() === '') {
                    errors[key] = "Ім'я обов'язкове для заповнення";
                }
                break;

            case 'lastname':
                if (userData[key].trim() === '') {
                    errors[key] = "Прізвище обов'язкове для заповнення";
                }
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (userData[key] && !emailRegex.test(userData[key])) {
                    errors[key] = 'Некоректний формат email';
                }
                break;

            case 'password':
                if (userData[key].length < 6) {
                    errors[key] = 'Пароль повинен містити щонайменше 6 символів';
                }
                break;

            default:
                break;
        }
    });

    return errors;
};
