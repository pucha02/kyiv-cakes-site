import { ProductName } from "../../atoms/product/Name/ProductName";
import { ProductCost } from "../../atoms/product/Cost/ProductCost";
import { ProductQuantitySelector } from "../../moleculs/QuantitySelector/QuantitySelector";
import { ProductButton } from "../../atoms/product/Button/ProductButton";
import { ProductImage } from "../../atoms/product/Image/ProductImage";
import { useState } from "react";
import { addToCart } from "../../../../services/cartService"; // Импортируем функцию добавления в корзину
import ProdImg from '../../../../resources/productImage/tart.webp';
import './ProductItem.css';

export const ProductItem = ({ id, name, cost, src, updateTotal, openModal, openCart }) => {
  const [count, setCount] = useState(1);

  const handleAddToCart = () => {
    addToCart({ id, name, cost, quantity: count, src });

    openCart()
  };

  return (
    <div className="product-card">
      <ProductImage src={src || ProdImg} alt={name} onClick={() => openModal({ id, name, cost, image: src || ProdImg })} /> {/* Клик для открытия модального окна */}
      <ProductName name={name} />
      <ProductCost cost={cost} />
      <ProductQuantitySelector count={count} setCount={setCount} updateTotal={updateTotal} />
      <ProductButton method={handleAddToCart} />
    </div>
  );
};
