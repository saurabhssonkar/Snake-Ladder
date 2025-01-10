import React, { useState } from "react";
import "./DiceRoll.css";

const DiceRoll = ({onRoll}) => {
  const [diceSide, setDiceSide] = useState(3);
  const [diceResult, setDiceResult] = useState("Click to roll the dice!");
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    const result = Math.floor(Math.random() * 6) + 1;
    setDiceSide(result);
    setIsRolling(true);

    // Simulate dice roll animation
    setTimeout(() => {
      setDiceResult(`You've got ${result}`);
      setIsRolling(false);
      if (onRoll) {
        onRoll(result); // Send the dice result to the parent
      }
    }, 800);
  };

  return (
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
  );
};

export default DiceRoll;
