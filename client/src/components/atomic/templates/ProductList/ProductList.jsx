import { useEffect, useMemo, useState } from "react";
import { ProductItem } from "../../organisms/ProductItem/ProductItem";
import ProductModal from "../ProductModal/ProductModal";
import './ProductList.css';

const ProductList = ({ isOpen, setIsOpen }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productList, setProductList] = useState([]); // State to store fetched products

  // Fetch products from the server on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products/getProducts'); // Fetch from your API
        const data = await response.json();
        console.log(data);
        setProductList(data); // Set the fetched data
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Categorize products
  const categorizedData = useMemo(() => {
    const categories = productList.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});

    // Добавляем категорию "Новинки"
    const newProducts = productList.filter((item) => item.type === 'new');
    if (newProducts.length > 0) {
      categories['Новинки'] = newProducts;
    }

    return categories;
  }, [productList]);

  const updateTotal = (cart) => {
    const total = cart.reduce((acc, item) => acc + item.cost * item.quantity, 0);
    setTotalPrice(total);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    console.log(product);
    setIsOpenModal(true);
  };

  const handleOpenCart = () => {
    setIsOpen(true);
    setIsOpenModal(false);
  };

  const renderItemsByCategory = (data) => {
    // Сортируем категории, чтобы "Новинки" отображались первыми
    const categories = Object.keys(data).sort((a, b) => (a === 'Новинки' ? -1 : b === 'Новинки' ? 1 : 0));

    return categories.map((category, idx) => (
      <div key={idx} id={category} className="category-group">
        <h2 className="category-title">{category}</h2>
        <ul className="product-list">
          {data[category].map((item, i) => (
            <li className="product-element" key={i}>
              <ProductItem
                id={item.id}
                name={item.name}
                cost={item.basePrice}
                src={item.coverImage}
                description={item.description}
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

  const elements = useMemo(() => renderItemsByCategory(categorizedData), [categorizedData]);

  return (
    <div>
      {/* Render categorized products, including "Новинки" */}
      {elements}

      {/* Uncomment and use if modal is needed */}
      {isOpenModal && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setIsOpenModal(false)}
          openCart={handleOpenCart}
          updateTotal={updateTotal}
        />
      )}
    </div>
  );
};

export default ProductList;