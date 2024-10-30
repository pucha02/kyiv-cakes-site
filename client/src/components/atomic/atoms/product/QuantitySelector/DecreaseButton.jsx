import './QuantitySelector.css';

export const DecreaseButton = ({ setCount, count, itemId, updateTotal }) => {
  const handleDecrease = () => {
    if (count > 1) {
      const updatedCount = count - 1;
      setCount(updatedCount);

      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const itemIndex = cart.findIndex((item) => item.id === itemId);

      if (itemIndex !== -1) {
        cart[itemIndex].quantity = updatedCount;
        localStorage.setItem('cart', JSON.stringify(cart));

        updateTotal(cart);
      }
    }
  };

  return (
    <div className={`minus ${count === 1 ? 'disabled' : ''}`} onClick={handleDecrease}>
      <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path fillRule="evenodd" d="M20,12 L20,13 L5,13 L5,12 L20,12 Z" />
      </svg>
    </div>
  );
};
