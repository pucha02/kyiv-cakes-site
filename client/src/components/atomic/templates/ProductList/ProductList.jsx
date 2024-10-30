import { ProductItem } from "../../organisms/ProductItem/ProductItem";
import ProductModal from "../ProductModal/ProductModal";
import { useEffect, useMemo, useState } from "react";
import useGetDataProduct from "../../../../services/fetchDatabyCategories";
import './ProductList.css';

const ProductList = ({ isOpen, setIsOpen }) => {
  const [data, setData] = useState({});
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { getAllProduct } = useGetDataProduct();

  const updateTotal = (cart) => {
    const total = cart.reduce((acc, item) => acc + item.cost * item.quantity, 0);
    setTotalPrice(total);
  };

  const categories = ["Порційні десерти", "Твої Веган Десерти", "Твої Кекси", "Твої сиропи", "Твої Тортики", "Кіш лорен"];

  useEffect(() => {
    const fetchData = async () => {
      const categoryData = {};
      for (const category of categories) {
        try {
          const result = await getAllProduct(category);
          categoryData[category] = result;
        } catch (error) {
          console.error(`Error fetching data for category ${category}:`, error);
        }
      }
      setData(categoryData);
    };

    fetchData();
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsOpenModal(true);
    console.log('asdasdsad')
  };

  const handleOpenCart = () => {
    setIsOpen(true);
    setIsOpenModal(false)
  };

  const renderItemsByCategory = (data) => {
    return Object.keys(data).map((category, idx) => (
      <div key={idx} id={category} className="category-group">
        <h2 className="category-title">{category}</h2>
        <ul className="product-list">
          {data[category].map((item, i) => (
            <li className="product-element" key={i}>
              <ProductItem
                id={item.id}
                name={item.name}
                cost={item.price}
                updateTotal={updateTotal}
                openModal={handleProductClick}
                openCart={handleOpenCart}
              />
            </li>
          ))}
        </ul>
      </div>
    ));
  };

  const elements = useMemo(() => renderItemsByCategory(data), [data]);

  return (
    <div>
      {elements}
      {isOpenModal && <ProductModal product={selectedProduct} onClose={() => setIsOpenModal(false)} openCart={handleOpenCart} updateTotal={updateTotal} />}
    </div>
  );
};

export default ProductList;
