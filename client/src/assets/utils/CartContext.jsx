import { createContext, useContext, useState } from 'react';

/** The cart item definition
 * @typedef {Object} CartItem
 * @property {number} id - The item's ID
 * @property {string} name - The item's name
 * @property {number} price - The item's price
 * @property {number} quantity - Amount of items
 * */

/** The shopping cart definition
 * @typedef {Object} ShoppingCart
 * @property {Array<CartItem> | undefined} items
 */

/** @type {ShoppingCart} */
const emptyCart = {};
export const CartContext = createContext();
export const useCartContext = () => useContext(CartContext);
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(emptyCart);
    
    return (
      <CartContext.Provider value={{ cart, setCart }}>
        {children}
      </CartContext.Provider>
    );
  };