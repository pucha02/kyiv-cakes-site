import './ProductModal.css';
import { useState } from 'react';
import { ProductName } from '../../atoms/product/Name/ProductName';
import { ProductCost } from '../../atoms/product/Cost/ProductCost';
import { ProductQuantitySelector } from '../../moleculs/QuantitySelector/QuantitySelector';
import { ProductButton } from '../../atoms/product/Button/ProductButton';
import { addToCart } from '../../../../services/cartService';

const ProductModal = ({ product, onClose, updateTotal, openCart }) => {

    const [count, setCount] = useState(1);

    const handleAddToCart = () => {
        addToCart({ id: product.id, name: product.name, cost: product.cost, quantity: count });
        console.log(JSON.parse(localStorage.getItem('cart')));
        openCart()
    };

    if (!product) return null;
    return (
        <div className="modal-overlay-product" onClick={onClose}>
            <div className="modal-content-product" onClick={(e) => e.stopPropagation()}>
                <div className='modal-content-product-img'>
                    <img src={product.image} alt={product.name} className="modal-image" />
                </div>
                <div className='modal-content-product-content'>
                    <div className='modal-content-product-content-fields'>
                        <ProductName name={product.name} />
                        
                    </div>
                    <div className='modal-content-product-content-btns'>
                        <div className='modal-content-product-content-cost'><span>Ціна:</span> <ProductCost cost={product.cost} /></div>
                        <ProductQuantitySelector count={count} setCount={setCount} updateTotal={updateTotal} />
                        <ProductButton method={handleAddToCart}  />
                        
                    </div>
                </div>
                <button className='close-button' onClick={onClose}>&times;</button>
            </div>
        </div>
    );
};

export default ProductModal;
