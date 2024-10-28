export const CountDisplay = ({ count, setCount }) => {
  return (
    <input
      className='count-product'
      type="text"
      value={count}
      onChange={(e) => {
        const value = parseInt(e.target.value, 10); // Преобразуем в число
        if (!isNaN(value) && value >= 0) { // Проверяем, что значение — число и не отрицательное
          setCount(value);
        }
      }}
    />
  );
};
