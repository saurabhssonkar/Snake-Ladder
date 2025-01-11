import React from "react";
import DiceRoll from "./DiceRoll"; // Import DiceRoll component

const SnakeFooter = ({ onRoll }) => {
  return (
    <div className="flex items-center justify-between bg-red-700 p-1 border-2 border-yellow-400 rounded-lg w-[600px] mx-auto">
      {/* Player 1 */}
      <div className="flex items-center gap-4">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbqoCse5t1d32CKsboF7aQ-q-A_2J86gVb3Q&s"
          alt="Player 1 Avatar"
          className="w-12 h-12 rounded-full border-2 border-white"
        />
        <div className="text-white">
          <div className="font-bold">You</div>
          <div className="text-yellow-400">13,900+</div>
        </div>
        <img
          src="/assest/ludoGoti1.png"
          className="w-9 h-9 p-1 rounded-full border-2 border-[#66CCFF] bg-white"
        />
      </div>

      {/* Dice Roll */}
      <DiceRoll onRoll={onRoll} />

      {/* Player 2 */}
      <div className="flex items-center gap-4">
        <img
          src="https://static.vecteezy.com/system/resources/previews/010/961/864/non_2x/avatar-female-character-free-vector.jpg"
          alt="Player 2 Avatar"
          className="w-12 h-12 rounded-full border-2 border-white"
        />
        <div className="text-white">
          <div className="font-bold">Tiger Rajput</div>
          <div className="text-yellow-400">3,361,200+</div>
        </div>
        <img
          src="/assest/ludoGoti2.png"
          alt="Player 2 Flag"
          className="w-9 h-9 p-1 rounded-full border-2 border-[#CC3399] bg-white"
        />
      </div>
    </div>
  );
};

export default SnakeFooter;
