import { useHttp } from "../hooks/http.hook";

const useGetDataProduct = () => {
  const { request, clearError, process, setProcess } = useHttp();

  const _url = 'http://localhost:3001/product-list';

  const getAllProduct = async (category) => {
    // Формируем URL с query параметром category
    const result = await request(`${_url}?category=${encodeURIComponent(category)}`);
    console.log(result);
    return result;
  };

  return {
    getAllProduct,
    process,
    setProcess,
    clearError,
  };
};

export default useGetDataProduct;