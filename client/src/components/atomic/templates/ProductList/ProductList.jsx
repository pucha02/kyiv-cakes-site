import { ProductItem } from "../../organisms/ProductItem/ProductItem";
import { useEffect, useMemo, useState } from "react";
import useGetDataProduct from "../../../../services/fetchDatabyCategories";
import './ProductList.css';

const ProductList = () => {
  const [data, setData] = useState({});
  const { getAllProduct } = useGetDataProduct();

  const categories = ["Торты", "Десерты", "Чизкейки"];

  useEffect(() => {
    // localStorage.setItem('cart', []);
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

  const renderItemsByCategory = (data) => {
    return Object.keys(data).map((category, idx) => (
      <div key={idx} className="category-group">
        <h2 className="category-title">{category}</h2>
        <ul className="product-list">
          {data[category].map((item, i) => (
            <li className="product-element" key={i}>
              <ProductItem name={item.name} cost={item.price} />
            </li>
          ))}
        </ul>
      </div>
    ));
  };

  const elements = useMemo(() => renderItemsByCategory(data), [data]);

  return <div>{elements}</div>;
};

export default ProductList;
