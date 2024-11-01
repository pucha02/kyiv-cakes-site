import './CartProductImage.css'

export const CartProductImage = ({src, alt}) => {
    return (
        <div className="cart-product-image">
            <img  src={src} alt={alt} />
        </div>
    )
}