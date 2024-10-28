import './ProductButton.css'

export const ProductButton = ({method}) => {
    return (
        <div className="product-button">
           <div onClick={method}>Додати у кошик</div>
        </div>
    )
}