import './ProductImage.css'

export const ProductImage = ({src, alt}) => {
    return (
        <div >
            <img className="product-image" src={src} alt={alt} />
        </div>
    )
}