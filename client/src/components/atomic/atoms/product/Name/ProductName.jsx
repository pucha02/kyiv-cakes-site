import './ProductName.css'

export const ProductName = ({name}) => {
    return (
        <div className="product-name">
            <p>{name}</p>
        </div>
    )
}