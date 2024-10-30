import { useState } from "react";
import { InputWithLabelOrder } from "../../moleculs/InputWithLabelOrder/InputWithLabelOrder";
import { SubmitFormButton } from "../../atoms/orderForm/submitButton/SubmitFormButton";

export const OrderForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        establishment: '',
        firstName: '',
        lastName: '',
        deliveryDate: '',
        order: JSON.parse(localStorage.getItem('cart'))
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5001/api/mongo-orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Order submitted successfully!");
            } else {
                console.error("Failed to submit order");
            }
        } catch (error) {
            console.error("Error submitting order:", error);
        }
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
                <InputWithLabelOrder 
                    label={'Телефон *'} 
                    type={'text'} 
                    name={"phone"} 
                    placeholder={'Введіть номер телефону'} 
                    value={formData.phone}
                    onChange={handleInputChange} 
                />
                <InputWithLabelOrder 
                    label={'Назва закладу *'} 
                    type={'text'} 
                    name={"establishment"} 
                    placeholder={'Введіть назву закладу'} 
                    value={formData.establishment}
                    onChange={handleInputChange} 
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
                    type={'date'} 
                    name={"deliveryDate"}
                    placeholder={'Оберіть дату доставки'} 
                    value={formData.deliveryDate}
                    onChange={handleInputChange} 
                />
                <SubmitFormButton />
            </form>
        </div>
    );
};
