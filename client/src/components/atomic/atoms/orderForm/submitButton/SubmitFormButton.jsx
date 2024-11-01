import './SubmitFormButton.css';

export const SubmitFormButton = ({ isLoading }) => {
    return (
        <button className='submit-form-button' type="submit" disabled={isLoading}>
            {isLoading ? 'Завантаження...' : 'Оформити замовлення'}
        </button>
    );
};
