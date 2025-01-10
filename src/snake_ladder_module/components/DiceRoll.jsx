import React, { useState } from "react";
import "./DiceRoll.css"; // Make sure the styles are imported

const DiceRoll = ({ onRoll }) => {
  const [diceSide, setDiceSide] = useState(3);
  const [isRolling, setIsRolling] = useState(false);
  const [diceResult, setDiceResult] = useState("Click to roll the dice!");

  const rollDice = () => {
    const result = Math.floor(Math.random() * 6) + 1;
    setDiceSide(result);
    setIsRolling(true);

    // Simulate dice roll animation
    setTimeout(() => {
      setDiceResult(`You've got ${result}`);
      setIsRolling(false);

      // Delay sending the result until the animation stops
      setTimeout(() => {
        if (onRoll) {
          onRoll(result); // Send the dice result to the parent component
        }
      }, 1500); // Small delay to ensure the animation visually completes
    }, 800); // Dice roll animation time
  };

  return (
    <div className="flex items-center justify-center bg-yellow-400 p-3 rounded-lg">
      <div className="dice-roll-container">
        <div
          id="dice"
          className={`dice ${isRolling ? "reRoll" : ""}`}
          data-side={diceSide}
          onClick={rollDice}
        >
          <div className={`sides side-1 ${diceSide === 1 ? "active" : ""}`}>
            <span className="dot dot-1"></span>
          </div>
          <div className={`sides side-2 ${diceSide === 2 ? "active" : ""}`}>
            <span className="dot dot-1"></span>
            <span className="dot dot-2"></span>
          </div>
          <div className={`sides side-3 ${diceSide === 3 ? "active" : ""}`}>
            <span className="dot dot-1"></span>
            <span className="dot dot-2"></span>
            <span className="dot dot-3"></span>
          </div>
          <div className={`sides side-4 ${diceSide === 4 ? "active" : ""}`}>
            <span className="dot dot-1"></span>
            <span className="dot dot-2"></span>
            <span className="dot dot-3"></span>
            <span className="dot dot-4"></span>
          </div>
          <div className={`sides side-5 ${diceSide === 5 ? "active" : ""}`}>
            <span className="dot dot-1"></span>
            <span className="dot dot-2"></span>
            <span className="dot dot-3"></span>
            <span className="dot dot-4"></span>
            <span className="dot dot-5"></span>
          </div>
          <div className={`sides side-6 ${diceSide === 6 ? "active" : ""}`}>
            <span className="dot dot-1"></span>
            <span className="dot dot-2"></span>
            <span className="dot dot-3"></span>
            <span className="dot dot-4"></span>
            <span className="dot dot-5"></span>
            <span className="dot dot-6"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiceRoll;
