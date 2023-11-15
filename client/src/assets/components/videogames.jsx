const YOUR_API_KEY = '58a87a3a93ee416aa7dc8d0092badaee'
import React, { useState, useEffect } from 'react';
const numberOfGamer = 1;

const GameList = () => {
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page_size=100&ordering=-rating`);
        const data = await response.json();
        
        if(data.results.length > 0 ){
            const randIndex = Math.floor(Math.random() * data.results.length);
            setGame(data.results[randIndex])
        } else {
            console.error('No game found');
        } 

        //setGames(data.results.slice(0,numberOfGamer));
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="game-list">
      {game && (
        <div key={game.id} className="game-card">
          <img
            src={game.background_image}
            alt={game.name}
            className="game-image"
          />
          <div className="game-details">
            <h3 className="game-name">{game.name}</h3>
          </div>
        </div>
      )}
    </div>
  );

};

export default GameList;
