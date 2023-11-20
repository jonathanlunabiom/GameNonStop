import React, { createContext, useContext, useState } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (game) => {
    console.log("Trying to add to wishlist:", game.name); // Log the game being added
    // Prevent adding duplicate games
    if (!wishlist.some(item => item._id === game._id)) {
      setWishlist([...wishlist, game]);
      console.log("Added to wishlist:", game.name); // Log successful addition
    } else {
      console.log("Game already in wishlist:", game.name); // Log duplicate case
    }
  };

  const removeFromWishlist = (gameId) => {
    console.log("Removing from wishlist, game ID:", gameId); // Log the ID of the game being removed
    setWishlist(currentWishlist => currentWishlist.filter(item => item.id !== gameId));
    console.log("Removed from wishlist, game ID:", gameId); // Log successful removal
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
