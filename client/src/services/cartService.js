// cartService.js

const CART_KEY = "cart";

export const getCart = () => {
  const storedCart = localStorage.getItem(CART_KEY);
  return storedCart ? JSON.parse(storedCart) : [];
};

export const addToCart = (product) => {
  const cart = getCart();
  const existingProductIndex = cart.findIndex((item) => item.id === product.id);
  console.log(product)
  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += product.quantity || 1;
  } else {
    cart.push({ ...product, quantity: product.quantity || 1 });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));

  window.dispatchEvent(new Event("storage"));
};

// export const removeFromCart = (productName) => {
//   const cart = getCart().filter((item) => item.name !== productName);
//   localStorage.setItem(CART_KEY, JSON.stringify(cart));

//   window.dispatchEvent(new Event("storage"));
// };
