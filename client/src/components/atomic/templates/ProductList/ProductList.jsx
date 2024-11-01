// import { ProductItem } from "../../organisms/ProductItem/ProductItem";
// import ProductModal from "../ProductModal/ProductModal";
// import { useEffect, useMemo, useState } from "react";
// import useGetDataProduct from "../../../../services/fetchDatabyCategories";
// import './ProductList.css';

// const ProductList = ({ isOpen, setIsOpen }) => {
//   const [data, setData] = useState({});
//   const [isOpenModal, setIsOpenModal] = useState(false)
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const { getAllProduct } = useGetDataProduct();

//   const updateTotal = (cart) => {
//     const total = cart.reduce((acc, item) => acc + item.cost * item.quantity, 0);
//     setTotalPrice(total);
//   };

//   const categories = ["Порційні десерти", "Твої Веган Десерти", "Твої Кекси", "Твої сиропи", "Твої Тортики", "Кіш лорен"];

//   useEffect(() => {
//     const fetchData = async () => {
//       const categoryData = {};
//       for (const category of categories) {
//         try {
//           const result = await getAllProduct(category);
//           categoryData[category] = result;
//         } catch (error) {
//           console.error(`Error fetching data for category ${category}:`, error);
//         }
//       }
//       setData(categoryData);
//     };

//     fetchData();
//   }, []);

//   const handleProductClick = (product) => {
//     setSelectedProduct(product);
//     setIsOpenModal(true);
//     console.log('asdasdsad')
//   };

//   const handleOpenCart = () => {
//     setIsOpen(true);
//     setIsOpenModal(false)
//   };

//   const renderItemsByCategory = (data) => {
//     return Object.keys(data).map((category, idx) => (
//       <div key={idx} id={category} className="category-group">
//         <h2 className="category-title">{category}</h2>
//         <ul className="product-list">
//           {data[category].map((item, i) => (
//             <li className="product-element" key={i}>
//               <ProductItem
//                 id={item.id}
//                 name={item.name}
//                 cost={item.price}
//                 updateTotal={updateTotal}
//                 openModal={handleProductClick}
//                 openCart={handleOpenCart}
//               />
//             </li>
//           ))}
//         </ul>
//       </div>
//     ));
//   };

//   const elements = useMemo(() => renderItemsByCategory(data), [data]);

//   return (
//     <div>
//       {elements}
//       {isOpenModal && <ProductModal product={selectedProduct} onClose={() => setIsOpenModal(false)} openCart={handleOpenCart} updateTotal={updateTotal} />}
//     </div>
//   );
// };

// export default ProductList;
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
        const response = await fetch('http://13.60.53.226/api/products'); // Fetch from your API
        const data = await response.json();
        console.log(data)
        setProductList(data); // Set the fetched data
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Categorize products
  const categorizedData = useMemo(() => (
    productList.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {})
  ), [productList]);

  const updateTotal = (cart) => {
    const total = cart.reduce((acc, item) => acc + item.cost * item.quantity, 0);
    setTotalPrice(total);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    console.log(product)
    setIsOpenModal(true);
  };

  const handleOpenCart = () => {
    setIsOpen(true);
    setIsOpenModal(false);
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
                cost={item.basePrice}
                src={item.coverImage}
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
      {elements}
      {/* {isOpenModal && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setIsOpenModal(false)}
          openCart={handleOpenCart}
          updateTotal={updateTotal}
        />
      )} */}
    </div>
  );
};

export default ProductList;


