import { useState } from "react"

export const AdminUpdateProducts = () => {
    const [message, setMessage] = useState(''); // State for status messages


    const updateProducts = async () => {
        try {
            const response = await fetch('http://13.60.53.226/api/getProductsFromCrm', {
                method: 'POST',
            });

            if (response.ok) {
                setMessage("Оновлення товарів завершено успішно.");
            } else {
                setMessage("Помилка при оновленні товарів: " + response.statusText);
            }
        } catch (error) {
            setMessage("Помилка мережі при оновленні товарів: " + error.message);
        }
    };
    return (
        <>
            <button type="button" className="update-button" onClick={updateProducts}>
                Оновити дані товарів
            </button>
            {message && <p className="message">{message}</p>}
        </>
    )
}