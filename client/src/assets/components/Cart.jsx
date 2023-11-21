import React, { useState } from 'react';

// Assuming you have a CartItem component
import CartItem from './CartItem';
import { useCartContext } from '../utils/CartContext';

const Cart = () => {
  const {cart, setCart} = useCartContext();

  // Function to remove item from cart
  const handleRemove = (itemId) => {
    setCart({
      items: cart?.items?.filter(item => item._id !== itemId) || []
    });
  };

  // Function to update quantity
  const handleQuantityChange = (itemId, newQuantity) => {
    setCart({
      items: cart?.items?.map(item => item._id === itemId
        ? { ...item, quantity: newQuantity }
        : item
      )
    });
  };

  localStorage.setItem('cart', JSON.stringify(cart));

  // Calculate total price
  const totalPrice = cart?.items?.reduce((total, item) => total + item.price * (item.quantity || 1), 0) ?? 0;

  return (
    <div>
      <h1>Cart</h1>
      {cart?.items?.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart?.items?.map(item => (
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