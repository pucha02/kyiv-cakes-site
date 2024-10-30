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
import { ProductItem } from "../../organisms/ProductItem/ProductItem";
import ProductModal from "../ProductModal/ProductModal";
import { useMemo, useState } from "react";
import './ProductList.css';

const ProductList = ({ isOpen, setIsOpen }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Данные о продуктах
  const productList = [
    { id: "31fd5fc3-813d-4ca3-ad3d-37ec294b1de3", name: "Тарт Малина", price: 150, image: "", category: "Порційні десерти" },
    { id: "2a90725e-c430-42ed-9cb8-9026dc6bd9f5", name: "Торт Шоколадный", price: 200, image: "../../../../resources/productImage/tart.webp", category: "Порційні десерти" },
    { id: "aec8409a-78dc-45de-ae5e-8f6349a234fe", name: "Чизкейк Классический", price: 180, image: "../../../../resources/productImage/tart.webp", category: "Твої Веган Десерти" },
    { id: "dea914e0-1b2c-4490-a3c6-5ef7a86719a6", name: "Торт Фрукты", price: 220, image: "../../../../resources/productImage/tart.webp", category: "Порційні десерти" },
    { id: "67654212-7eee-406d-a5f6-3ea094255f24", name: "Эклер Классический", price: 100, image: "../../../../resources/productImage/tart.webp", category: "Твої Кекси" },
    { id: "8f95571b-3472-41d3-ba83-e8270bc5f694", name: "Торт Медовик", price: 170, image: "../../../../resources/productImage/tart.webp", category: "Порційні десерти" },
    { id: "a31db206-b6f8-4c63-850a-9298e438fee1", name: "Капкейки Ванильные", price: 120, image: "../../../../resources/productImage/tart.webp", category: "Твої Веган Десерти" },
    { id: "d35a0acf-fb46-4a50-97c1-0e1e822a35db", name: "Пирог Яблочный", price: 140, image: "../../../../resources/productImage/tart.webp", category: "Твої сиропи" },
    { id: "108ea58f-3580-47b2-b4ad-7ddf7052a9a6", name: "Торт Тирамису", price: 230, image: "../../../../resources/productImage/tart.webp", category: "Твої сиропи" },
    { id: "72781014-0859-4f33-b509-9f792d973e27", name: "Кекс Шоколадный", price: 110, image: "../../../../resources/productImage/tart.webp", category: "Твої Веган Десерти" },
    { id: "e7e57590-fa0c-4d75-9e8c-47ed18b69770", name: "Торт Черепаха", price: 260, image: "../../../../resources/productImage/tart.webp", category: "Твої сиропи" },
    { id: "1", name: "Морозное Мороженое", price: 90, image: "../../../../resources/productImage/tart.webp", category: "Кіш лорен" },
    { id: "2", name: "Пирожное Наполеон", price: 130, image: "../../../../resources/productImage/tart.webp", category: "Кіш лорен" },
    { id: "3", name: "Торт Клубника", price: 240, image: "../../../../resources/productImage/tart.webp", category: "Твої Тортики" },
    { id: "4", name: "Брауни Классический", price: 160, image: "../../../../resources/productImage/tart.webp", category: "Твої Кекси" },
    { id: "5", name: "Пирог Творожный", price: 150, image: "../../../../resources/productImage/tart.webp", category: "Твої Тортики" },
    { id: "6", name: "Кексы Ягодные", price: 125, image: "../../../../resources/productImage/tart.webp", category: "Твої Веган Десерти" },
    { id: "7", name: "Торт Апельсиновый", price: 200, image: "../../../../resources/productImage/tart.webp", category: "Твої Кекси" },
    { id: "8", name: "Пирожное Шоколадное", price: 140, image: "../../../../resources/productImage/tart.webp", category: "Твої Тортики" },
    { id: "9", name: "Торт Сливочный", price: 210, image: "../../../../resources/productImage/tart.webp", category: "Твої Кекси" }
  ];

  // Категоризация продуктов
  const data = productList.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const updateTotal = (cart) => {
    const total = cart.reduce((acc, item) => acc + item.cost * item.quantity, 0);
    setTotalPrice(total);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
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

