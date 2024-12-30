import React, { useState } from "react";
import "./DiceRoll.css";
// import 'font-awesome/css/font-awesome.min.css';


const DiceRoll = () => {
  const [cubeStyle, setCubeStyle] = useState({
    transform: '',
    animation: '',
  });

  const angleArray = [
    [0, 0, 0],
    [-310, -362, -38],
    [-400, -320, -2],
    [135, -217, -88],
    [-224, -317, 5],
    [-47, -219, -81],
    [-133, -360, -53],
  ];

  const rollDice = () => {
    const randomAngle = Math.floor(Math.random() * 6) + 1;

    setCubeStyle({
      transform: `rotateX(${angleArray[randomAngle][0]}deg) rotateY(${angleArray[randomAngle][1]}deg) rotateZ(${angleArray[randomAngle][2]}deg)`,
      animation: 'animate 1s linear',
    });

    setTimeout(() => {
      setCubeStyle((prevStyle) => ({ ...prevStyle, animation: '' }));
    }, 500);
  };

  return (
    <div className="container">
      <div
        className="cube"
        id="cube"
        style={cubeStyle}
        onClick={rollDice}
      >
        <div className="front">
          <span className="fa fa-circle"></span>
        </div>
        <div className="back">
          <pre className="firstPre">
            <span className="fa fa-circle"></span>    <span className="fa fa-circle"></span>    <span className="fa fa-circle"></span>
          </pre>
          <br />
          <pre className="secondPre">
            <span className="fa fa-circle"></span>    <span className="fa fa-circle"></span>    <span className="fa fa-circle"></span>
          </pre>
        </div>
        <div className="top">
          <span className="fa fa-circle"></span>
          <span className="fa fa-circle"></span>
        </div>
        <div className="left">
          <span className="fa fa-circle"></span>
          <span className="fa fa-circle"></span>
          <span className="fa fa-circle"></span>
        </div>
        <div className="right">
          <span className="fa fa-circle"></span>
          <span className="fa fa-circle"></span>
          <span className="fa fa-circle"></span>
          <span className="fa fa-circle"></span>
          <span className="fa fa-circle"></span>
        </div>
        <div className="bottom">
          <span className="fa fa-circle"></span>
          <span className="fa fa-circle"></span>
          <span className="fa fa-circle"></span>
          <span className="fa fa-circle"></span>
        </div>
      </div>
    </div>
  );
};

export default DiceRoll;
