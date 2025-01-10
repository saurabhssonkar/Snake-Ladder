import React from "react";
import DiceRoll from "./DiceRoll"; // Import DiceRoll component

const SnakeFooter = ({ onRoll }) => {
  return (
    <div className="flex items-center justify-between bg-red-700 p-4 border-4 border-yellow-400 rounded-lg w-[600px] mx-auto">
      {/* Player 1 */}
      <div className="flex items-center gap-4">
        <img
          src="https://via.placeholder.com/50"
          alt="Player 1 Avatar"
          className="w-12 h-12 rounded-full border-2 border-white"
        />
        <div className="text-white">
          <div className="font-bold">You</div>
          <div className="text-yellow-400">13,900</div>
        </div>
        <img
          src="https://via.placeholder.com/20"
          alt="Player 1 Flag"
          className="w-5 h-5 rounded-full border-2 border-white"
        />
      </div>

      {/* Dice Roll */}
      <DiceRoll onRoll={onRoll} />

      {/* Player 2 */}
      <div className="flex items-center gap-4">
        <img
          src="https://via.placeholder.com/50"
          alt="Player 2 Avatar"
          className="w-12 h-12 rounded-full border-2 border-white"
        />
        <div className="text-white">
          <div className="font-bold">Tiger Rajput</div>
          <div className="text-yellow-400">3,361,200</div>
        </div>
        <img
          src="https://via.placeholder.com/20"
          alt="Player 2 Flag"
          className="w-5 h-5 rounded-full border-2 border-white"
        />
      </div>
    </div>
  );
};

export default SnakeFooter;
