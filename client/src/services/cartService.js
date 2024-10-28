const CART_KEY = "cart";

export const getCart = () => {
  const storedCart = localStorage.getItem(CART_KEY);
  return storedCart ? JSON.parse(storedCart) : [];
};

export const addToCart = (product) => {
  const cart = getCart();
  const existingProduct = cart.find((item) => item.name === product.name);
  
  if (existingProduct) {
    existingProduct.quantity += product.quantity;
  } else {
    cart.push(product);
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  console.log(localStorage.getItem(CART_KEY))
};

export const removeFromCart = (productName) => {
  const cart = getCart().filter((item) => item.name !== productName);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};
