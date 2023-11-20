import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/queries';

const AddToCartButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 15px;
  margin-top: 10px;
  margin-left: 10px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #45a049;
  }
`;

const AddToWishlistButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 15px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #45a049;
  }
`;

const GameCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

const GameImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const GameDetails = styled.div`
  padding: 0.5rem;
`;

const GameName = styled.h3`
  margin: 0;
`;

const GameListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-bottom: 1rem;
  margin-top: 2rem;
`;

const GameList = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const addToCart = (game) => {
    // Logic to add the game to the cart
    console.log('Adding to cart:', game.name);
    // Update the cart state/context here
  };

  const addToWishlist = (game) => {
    // Logic to add the game to the wishlist
    console.log('Adding to wishlist:', game.name);
    // Update the wishlist state/context here
  };

  const games = data.products;

  return (
    <GameListContainer>
      {games.map((game) => (
        <GameCard key={game._id}>
          <GameImage src={game.image} alt={game.name} />
          <GameDetails>
            <GameName>{game.name}</GameName>
            <p>Price: ${game.price}</p>
            {game.quantity && <p>Quantity: {game.quantity}</p>}
            <p>Category: {game.category}</p>
            <AddToWishlistButton onClick={() => addToWishlist(game)}>Add to Wishlist</AddToWishlistButton>
            <AddToCartButton onClick={() => addToCart(game)}>Add to Cart</AddToCartButton>
          </GameDetails>
        </GameCard>
      ))}
    </GameListContainer>
  );
};


export default GameList;
