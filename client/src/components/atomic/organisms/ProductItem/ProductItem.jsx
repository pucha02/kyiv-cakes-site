import { ProductName } from "../../atoms/product/Name/ProductName";
import { ProductCost } from "../../atoms/product/Cost/ProductCost";
import { ProductQuantitySelector } from "../../moleculs/QuantitySelector/QuantitySelector";
import { ProductButton } from "../../atoms/product/Button/ProductButton";
import { ProductImage } from "../../atoms/product/Image/ProductImage";
import { useState } from "react";
import { addToCart } from "../../../../services/cartService"; // Импортируем функцию добавления в корзину
import ProdImg from '../../../../resources/productImage/tart.webp';
import './ProductItem.css';

export const ProductItem = ({ name, cost }) => {
  const [count, setCount] = useState(1);

  const handleAddToCart = () => {
    addToCart({ name, cost, quantity: count });
    console.log("Товар добавлен в корзину");
  };

  return (
    <div className="product-card">
      <ProductImage src={ProdImg} alt={name} />
      <ProductName name={name} />
      <ProductCost cost={cost} />
      <ProductQuantitySelector count={count} setCount={setCount} />
      <ProductButton method={handleAddToCart} />
    </div>
  );
};
