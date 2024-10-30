import './ProductImage.css'

export const ProductImage = ({src, alt, onClick}) => {
    return (
        <div style={{cursor:"pointer"}}>
            <img onClick={onClick} className="product-image" src={src} alt={alt} />
        </div>
    )
}