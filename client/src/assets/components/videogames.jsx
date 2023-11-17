import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const YOUR_API_KEY = '58a87a3a93ee416aa7dc8d0092badaee';

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
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page_size=16&ordering=+rating`);
        const data = await response.json();
  
        const uniqueGames = [...new Set(data.results.map(game => JSON.stringify(game)))].map(str => JSON.parse(str));
  
        if (uniqueGames.length === 16) {
          setGames(uniqueGames);
        } else {
          console.error('Unexpected number of games');
        }
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };
  
    fetchGames();
  }, []);

  return (
    <GameListContainer>
      {games.map((game) => (
        <GameCard key={game.id}>
          <GameImage src={game.background_image} alt={game.name} />
          <GameDetails>
            <GameName>{game.name}</GameName>
            {/* Seccion para agregar más detalles como la calificación, descuentos, etc. */}
          </GameDetails>
        </GameCard>
      ))}
    </GameListContainer>
  );
};

export default GameList;

