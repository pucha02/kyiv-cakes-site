import './PriceCartProducts.css'

export const PriceCartProducts = ({ price, className }) => {
    return (
        <div className={className}>{price} ₴</div>
    )
}