import React, { useState } from 'react';

// Assuming you have a CartItem component
import CartItem from './CartItem';

const Cart = () => {
  // Example cart items (usually this would come from a global state or API)
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Game A', price: 29.99, quantity: 1 },
    { id: 2, name: 'Game B', price: 19.99, quantity: 2 },
    // ... other cart items ...
  ]);

  // Function to remove item from cart
  const handleRemove = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  // Function to update quantity
  const handleQuantityChange = (itemId, newQuantity) => {
    setCartItems(cartItems.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <CartItem 
              key={item.id}
              item={item}
              onRemove={handleRemove}
              onQuantityChange={handleQuantityChange}
            />
          ))}
          <div>
            <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
          </div>
          <button>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;