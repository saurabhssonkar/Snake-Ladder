import React, { createContext, useState } from "react";

// Create a context
const PlayerContext = createContext();

// Create a provider component
const PlayerProvider = ({ children }) => {
  const [activePlayer, setActivePlayer] = useState(1); // State to track active player, 1 for player1, 2 for player2

  // Function to toggle between player 1 (1) and player 2 (2)
  const togglePlayer = () => setActivePlayer(prev => (prev === 1 ? 2 : 1));

  return (
    <PlayerContext.Provider value={{ activePlayer, togglePlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerProvider };
