import { useState } from "react";
import { InputWithLabelOrder } from "../../moleculs/InputWithLabelOrder/InputWithLabelOrder";
import { SubmitFormButton } from "../../atoms/orderForm/submitButton/SubmitFormButton";
import useGetDataUser from "../../../../services/FetchUserData";
import { useEffect } from "react";
import './OrderForm.css';

export const OrderForm = () => {
    const { getAllUserData } = useGetDataUser();
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        establishment: '',
        firstName: '',
        lastName: '',
        deliveryDate: '',
        country: 'Україна',
        city: '',
        address: '',
        order: JSON.parse(localStorage.getItem('cart') || '[]')
    });
    
    const [errors, setErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllUserData();
                console.log(result.user.firstname);
                if (result) {
                    setFormData((prevDetails) => ({
                        ...prevDetails,
                        phone: result.user.number_phone || '',
                        firstName: result.user.firstname || '',
                        lastName: result.user.lastname || '',
                        establishment: result.user.companyname || '',
                    }));
                }
                // Обновляем только поле email

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    // Перевірка номера телефону
    const validatePhone = (phone) => /^\+380\d{9}$/.test(phone);

    // Перевірка електронної пошти
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); // Очищення помилок при введенні
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        // Перевірка полів з валідацією
        if (!validatePhone(formData.phone)) {
            newErrors.phone = "Номер повинен починатися з +380 і містити 12 цифр";
        }
        if (!validateEmail(formData.email)) {
            newErrors.email = "Неправильний формат електронної пошти";
        }

        // Якщо є помилки, встановлюємо їх і перериваємо відправлення
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/mongo-orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Замовлення успішно надіслано!");
                setIsModalOpen(true);
                localStorage.setItem('cart', JSON.stringify([]));
            } else {
                console.error("Не вдалося надіслати замовлення");
            }
        } catch (error) {
            console.error("Помилка при надсиланні замовлення:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        window.location.href = '/kyivcakes';
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Дані клієнта</h2>
                <InputWithLabelOrder
                    label={'Ел. адреса *'}
                    type={'email'}
                    name={"email"}
                    placeholder={'Введіть email'}
                    value={formData.email}
                    onChange={handleInputChange}
                />
                {errors.email && <p className="error-text">{errors.email}</p>}

                <InputWithLabelOrder
                    label={'Телефон *'}
                    type={'text'}
                    name={"phone"}
                    placeholder={'Введіть номер телефону (+380990000000)'}
                    value={formData.phone}
                    onChange={handleInputChange}
                    onFocus={(e) => {
                        if (!e.target.value) {
                            handleInputChange({ target: { name: 'phone', value: '+380' } });
                        }
                    }}
                    disabled={true}
                />
                {errors.phone && <p className="error-text">{errors.phone}</p>}

                <InputWithLabelOrder
                    label={'Назва закладу *'}
                    type={'text'}
                    name={"establishment"}
                    placeholder={'Введіть назву закладу'}
                    value={formData.establishment}
                    onChange={handleInputChange}
                    disabled={true} 
                />

                <InputWithLabelOrder
                    label={"Ім'я *"}
                    type={'text'}
                    name={"firstName"}
                    placeholder={"Введіть Ім'я"}
                    value={formData.firstName}
                    onChange={handleInputChange}
                />

                <InputWithLabelOrder
                    label={'Прізвище *'}
                    type={'text'}
                    name={"lastName"}
                    placeholder={'Введіть прізвище'}
                    value={formData.lastName}
                    onChange={handleInputChange}
                />

                <InputWithLabelOrder
                    label={'Дата доставки *'}
                    type={'datetime-local'}
                    name={"deliveryDate"}
                    placeholder={'Оберіть дату доставки'}
                    value={formData.deliveryDate}
                    onChange={handleInputChange}
                />

                <h2>Дані доставки</h2>
                <InputWithLabelOrder
                    label={'Країна/регіон *'}
                    type={'text'}
                    name={"country"}
                    value={formData.country}
                    onChange={handleInputChange}
                />

                <InputWithLabelOrder
                    label={'Місто *'}
                    type={'text'}
                    name={"city"}
                    value={formData.city}
                    onChange={handleInputChange}
                />

                <InputWithLabelOrder
                    label={'Адреса *'}
                    type={'text'}
                    name={"address"}
                    value={formData.address}
                    onChange={handleInputChange}
                />

                <SubmitFormButton isLoading={isLoading} />
            </form>

            {isModalOpen && (
                <div className="modal-overlay-succsess">
                    <div className="modal-succsess">
                        <p>Ваше замовлення успішно відправлено! Дані замовлення відправлені на email {formData.email}</p>
                        <button onClick={closeModal}>Закрити</button>
                    </div>
                </div>
            )}
        </div>
    );
};
