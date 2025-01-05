import React, { useState } from "react";
import GameBoard from "./GameBoard";
import DiceRoll from "./DiceRoll";

const App = () => {
  const [players, setPlayers] = useState([
    { id: 1, position: 1, color: "green" },
    { id: 2, position: 1, color: "yellow" },
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(0);

  const handleDiceRoll = (value) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player, index) => {
        if (index === currentPlayer) {
          return { ...player, position: Math.min(player.position + value, 100) };
        }
        return player;
      })
    );
    setCurrentPlayer((prev) => (prev + 1) % players.length);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Snakes and Ladders</h1>
      <GameBoard players={players} />
      <div className="mt-6">
        <DiceRoll onRoll={handleDiceRoll} />
      </div>
    </div>
  );
};

export default App;
