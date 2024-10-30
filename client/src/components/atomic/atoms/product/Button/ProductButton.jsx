import './ProductButton.css'

export const ProductButton = ({method}) => {
    return (
        
           <button className="product-button" type='button' onClick={method}>Додати у кошик</button>
       
    )
}