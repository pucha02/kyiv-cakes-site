export const CountDisplay = ({ count, setCount }) => {
  const handleBlur = () => {
    if (!count || count <= 0) {
      setCount("1"); // Устанавливаем "1", если поле пустое
    }
  };
  return (
    <input
      className='count-product'
      type="text"
      value={count || 0}
      onChange={(e) => {
        setCount(parseInt(e.target.value));
      }}
      onBlur={handleBlur}
    />
  );
};
