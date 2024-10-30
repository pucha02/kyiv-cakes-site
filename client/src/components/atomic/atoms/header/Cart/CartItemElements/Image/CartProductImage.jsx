import './CartProductImage.css'

export const CartProductImage = ({src, alt}) => {
    return (
        <div >
            <img className="cart-product-image" src={src} alt={alt} />
        </div>
    )
}