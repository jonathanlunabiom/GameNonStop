import React, { useState } from 'react';
import styled from 'styled-components';
import { useWishlist } from './WishlistContext'; // Import your useWishlist hook

// Example styled components
const WishlistContainer = styled.div`
  padding: 20px;
`;

const WishlistItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  border-bottom: 1px solid #ddd;
`;

const ItemDetails = styled.div`
  display: flex;
  align-items: center;
`;

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 15px;
`;

const ItemName = styled.h4`
  margin: 0;
`;

const ItemPrice = styled.p`
  margin: 0;
`;

const RemoveButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

const Wishlist = () => {
  // Retrieve wishlistItems and removeFromWishlist function from context
  const { wishlist: wishlistItems, removeFromWishlist } = useWishlist();

  // Function to remove item from wishlist
  const handleRemove = (itemId) => {
    removeFromWishlist(itemId);
  };

  return (
    <WishlistContainer>
      <h1>Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        wishlistItems.map(item => (
          <WishlistItem key={item.id}>
            <ItemDetails>
              <ItemImage src={item.imageUrl} alt={item.name} />
              <div>
                <ItemName>{item.name}</ItemName>
                <ItemPrice>${item.price.toFixed(2)}</ItemPrice>
              </div>
            </ItemDetails>
            <RemoveButton onClick={() => handleRemove(item.id)}>Remove</RemoveButton>
          </WishlistItem>
        ))
      )}
    </WishlistContainer>
  );
};

export default Wishlist;
