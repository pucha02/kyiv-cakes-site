import './QuantitySelector.css';

export const IncreaseButton = ({ setCount, count, itemId, updateTotal }) => {
    const handleIncrease = () => {
        const updatedCount = count + 1;
        setCount(updatedCount);
    
        // Retrieve and parse the cart from localStorage safely
        const cartData = localStorage.getItem('cart');
        const cart = cartData ? JSON.parse(cartData) : [];
    
        const itemIndex = cart.findIndex((item) => item.id === itemId);
    
        if (itemIndex !== -1) {
            cart[itemIndex].quantity = updatedCount;
            localStorage.setItem('cart', JSON.stringify(cart));
    
            // Update the total
            updateTotal(cart);
        }
    };

  return (
    <div className='plus' onClick={handleIncrease}>
      <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path fillRule="evenodd" d="M13,5 L13,12 L20,12 L20,13 L13,13 L13,20 L12,20 L11.999,13 L5,13 L5,12 L12,12 L12,5 L13,5 Z" />
      </svg>
    </div>
  );
};
