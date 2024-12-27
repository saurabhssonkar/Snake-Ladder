import React, { useEffect, useRef, useState } from "react";
import snake4 from "../assest/snake1.png"
import snake5 from "../assest/snake2.png"
import snake6 from "../assest/snake3.png"
import ladder1 from "../assest/ladder1.png"

const SnakeAndLadder = () => {
  const canvasRef = useRef(null);
  const canvas1Ref = useRef(null);
  const [diceNumber, setDiceNumber] = useState(1);
  const resolution = 50;
  const [tiles, setTiles] = useState([]);
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(1);

  const cols = 500 / resolution;
  const rows = 500 / resolution;


  let x = 0;
  let y = (rows - 1) * resolution;
  let dir = 1;

  // --------------------- this code i done that why no problem of this code  ---------

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const canvas1 = canvas1Ref.current;
    const context1 = canvas1.getContext("2d");

    // Initialize images
    const snakeImage1 = new Image();
    const snakeImage2 = new Image();
    const snakeImage3 = new Image();
    const ladderImage1 = new Image();
    const ladderImage2 = new Image();
    const ladderImage3 = new Image();
    const ladderImage4 = new Image();

    snakeImage1.src = snake6;
    snakeImage2.src = snake5;
    snakeImage3.src = snake4;
    ladderImage1.src = ladder1;
    ladderImage2.src = ladder1;
    ladderImage3.src = ladder1;
    ladderImage4.src = ladder1;

    // Generate tiles
    for (let i = 0; i < cols * rows; i++) {
      const tile = {
        x,
        y,
        resolution,
        index: i,
        next: i + 1,

        color: i % 4 === 0 ? "#FF6666" : i % 4 === 1 ? "#003366" : i % 4 === 2 ? "#CCCC00" : "#006600",

        show() {
          // noting running this show function 
          console.log("@@@@@##!#@#")
          context.beginPath();
          context.fillStyle = this.color;
          context.fillRect(this.x, this.y, this.resolution, this.resolution);
          context.closePath();
        },

        getCenter() {
          let cx = this.x + this.resolution / 2;
          let cy = this.y + this.resolution / 2;
          return [cx, cy];
        },
        showNumbers() {
          context.beginPath();
          context.font = "13px Arial";
          context.fillStyle = "#fff";
          context.fillText(this.index + 1, this.x + resolution / 3 - 9, this.y + resolution / 3 - 5);
          context.closePath();
        },
        showLocation() {
          // console.log('Tile :'+(this.index+1)+'- X:'+this.x+', Y:'+this.y);
        }


      };

      tiles.push(tile);
      console.log("title", tile);
      x += resolution * dir;
      if (x >= 500 || x <= -resolution) {
        dir *= -1;
        x += resolution * dir;
        y -= resolution;
      }
    }
 

    // initail Draw game board
    const drawGamePlot = () => {
      tiles.forEach((tile) => {
        context.fillStyle = tile.color;
        context.fillRect(tile.x, tile.y, tile.resolution, tile.resolution);
        context.font = "13px Arial";
        context.fillStyle = "#fff";
        context.fillText(tile.index + 1, tile.x + resolution / 3 - 9, tile.y + resolution / 3 - 5);
      });

      // Draw images
      snakeImage1.onload = () => context.drawImage(snakeImage1, resolution, 250, 100, 300);
      snakeImage2.onload = () => context.drawImage(snakeImage2, 2 * resolution, 10, 200, 300);
      snakeImage3.onload = () => context.drawImage(snakeImage3, 6 * resolution, 150, 100, 300);
      ladderImage1.onload = () => {
        context.save();
        context.rotate(Math.PI / 11);
        context.drawImage(ladderImage1, 3 * resolution + 20, 4 * resolution + 10, 30, 200);
        context.restore();
      };
      ladderImage2.onload = () => {
        context.save();
        context.rotate(-Math.PI / 11);
        context.drawImage(ladderImage2, 3 * resolution - 10, 2 * resolution, 30, 200);
        context.restore();
      };
      ladderImage3.onload = () => context.drawImage(ladderImage3, 7 * resolution + 10, resolution - 15, 30, 300);
      ladderImage4.onload = () => context.drawImage(ladderImage4, 8 * resolution + 10, 7 * resolution - 20, 30, 100);
    };

    drawGamePlot();

  }, [cols, rows, resolution]);

// only logic for dice draw for the number
  useEffect(() => {
    console.log("saurabh render")
    const canvas1 = canvas1Ref.current;
    const context1 = canvas1.getContext("2d");

    class DrawDice {
      constructor() {
        this.x = 50;
        this.y = 180;
      }

      showDice(num) {
        console.log("num", num)
        context1.clearRect(0, 0, canvas1.width, canvas1.height); // Clear previous dice
        context1.beginPath();
        context1.strokeStyle = "#fff";
        context1.lineWidth = 3;
        context1.rect(this.x, this.y, 100, 100);
        context1.stroke();
        context1.closePath();

        context1.beginPath();
        context1.fillStyle = "#fff";
        switch (num) {
          case 1:
            context1.arc(this.x + 50, this.y + 50, 10, 0, Math.PI * 2);
            break;
          case 2:
            context1.arc(this.x + 30, this.y + 50, 10, 0, Math.PI * 2);
            context1.arc(this.x + 70, this.y + 50, 10, 0, Math.PI * 2);
            break;
          case 3:
            context1.arc(this.x + 20, this.y + 20, 10, 0, Math.PI * 2);
            context1.arc(this.x + 50, this.y + 50, 10, 0, Math.PI * 2);
            context1.arc(this.x + 80, this.y + 80, 10, 0, Math.PI * 2);
            break;
          case 4:
            context1.arc(this.x + 20, this.y + 20, 10, 0, Math.PI * 2);
            context1.arc(this.x + 80, this.y + 20, 10, 0, Math.PI * 2);
            context1.arc(this.x + 20, this.y + 80, 10, 0, Math.PI * 2);
            context1.arc(this.x + 80, this.y + 80, 10, 0, Math.PI * 2);
            break;
          case 5:
            context1.arc(this.x + 20, this.y + 20, 10, 0, Math.PI * 2);
            context1.arc(this.x + 80, this.y + 20, 10, 0, Math.PI * 2);
            context1.arc(this.x + 20, this.y + 80, 10, 0, Math.PI * 2);
            context1.arc(this.x + 80, this.y + 80, 10, 0, Math.PI * 2);
            context1.arc(this.x + 50, this.y + 50, 10, 0, Math.PI * 2);
            break;
          default:
            context1.arc(this.x + 20, this.y + 30, 10, 0, Math.PI * 2);
            context1.arc(this.x + 50, this.y + 30, 10, 0, Math.PI * 2);
            context1.arc(this.x + 80, this.y + 30, 10, 0, Math.PI * 2);
            context1.arc(this.x + 20, this.y + 70, 10, 0, Math.PI * 2);
            context1.arc(this.x + 50, this.y + 70, 10, 0, Math.PI * 2);
            context1.arc(this.x + 80, this.y + 70, 10, 0, Math.PI * 2);
        }
        context1.fill();
        context1.closePath();
      }
    }

    const dice = new DrawDice();
    dice.showDice(diceNumber);
  }, [diceNumber]);

  // this is the roll dice function to rool the dice with give value of this dice

  const rollDice = () => {
    // const canvas = canvasRef.current;
    // const context = canvas.getContext("2d");
    const newDiceNumber = Math.floor(Math.random() * 6) + 1;
    setDiceNumber(newDiceNumber);
    player1.show()
    player2.show()
    player1.roll()
    player2.roll()
    // const current = currentPlayer === 1 ? player1 : player2;
    // current.roll();
    // current.show(context);

   
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  }

 // ------------ this code is allright ok tha is no problem with this code ---------
  useEffect(() => {
    
    const context = canvasRef.current.getContext("2d");
    const diceContext = canvas1Ref.current.getContext("2d");

    // Initialize the board tiles
    const newTiles = [];
    for (let y = 0; y < 500; y += resolution) {
      for (let x = 0; x < 500; x += resolution) {
        newTiles.push({
          x,
          y,
          getCenter: () => [x + resolution / 2, y + resolution / 2],
        });
        context.strokeRect(x, y, resolution, resolution);
      }
    }
    setTiles(newTiles);

    // Initialize players
    setPlayer1(new Player("#fff", 1, diceContext, context,newTiles));
    setPlayer2(new Player("#0015ff", 2, diceContext,context, newTiles));
  }, []);


  class Player {
    constructor(color, playerNumber, diceContext, context, tiles) {
      this.spot = 0;
      this.previousSpot = 0;  // Track the previous spot to clear it later
      this.color = color;
      this.playerNumber = playerNumber;
      this.isActive = false;
      this.diceContext = diceContext;
      this.tiles = tiles;
      this.context = context;
      this.roll();  // Executes the roll method to set initial position
      this.show();  // Executes the show method to render the player position
    }
  
    roll() {
      console.log("Rolling dice...");
      let r = Math.floor(Math.random() * 6) + 1;  // Generate a random dice roll between 1 and 6
  
      if (r === 1) {
        this.isActive = true;
      }
  
      if (this.isActive) {
        this.previousSpot = this.spot;  // Save the previous spot before updating
        this.spot += r;  // Move player spot by the dice roll
        this.spot = Math.min(this.spot, this.tiles.length - 1);  // Prevent out of bounds
      }
  
      // Optionally, you can call showDice here if you want to display the dice immediately
      // this.showDice(r);
    }
  
    showDice(num) {
      
    }
  
    show() {

        // console.log("3",this.context)
        let currentTile = tiles[this.spot];
        const previousTile = tiles[this.previousSpot]; 
        console.log("currenttitle",currentTile)
        console.log("previousTile",previousTile)

  
        let center = currentTile.getCenter();
        console.log("center@@@123", center)
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.arc(center[0], center[1], resolution / 2 - 10, 0, Math.PI * 2);
        this.context.fill();
        this.context.closePath();
     
      if (previousTile) {
        let prevCenter = previousTile.getCenter();
        
        this.context.clearRect(prevCenter[0] - 15, prevCenter[1] - 15, 30, 30); // Clear previous position
        this.context.fillStyle = 'red';
        this.context.fillRect(prevCenter[0] - 15, prevCenter[1] - 15, 30, 30);
      }
  
      
  
      if (currentTile.x == 50 && currentTile.y == 400) {
        this.spot = 42;
        currentTile = tiles[this.spot];
        center = currentTile.getCenter();
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.arc(center[0], center[1], resolution / 2 - 10, 0, Math.PI * 2);
        this.context.fill();
        this.context.closePath();
      }
      else if (currentTile.x == 400 && currentTile.y == 400) {
        this.spot = 31;
        currentTile = tiles[this.spot];
        center = currentTile.getCenter();
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.arc(center[0], center[1], resolution / 2 - 10, 0, Math.PI * 2);
        this.context.fill();
        this.context.closePath();
      }
      else if (currentTile.x == 350 && currentTile.y == 300) {
        this.spot = 92;
        currentTile = tiles[this.spot];
        center = currentTile.getCenter();
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.arc(center[0], center[1], resolution / 2 - 10, 0, Math.PI * 2);
        this.context.fill();
        this.context.closePath();
      }
      else if (currentTile.x == 200 && currentTile.y == 200) {
        this.spot = 83;
        currentTile = tiles[this.spot];
        center = currentTile.getCenter();
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.arc(center[0], center[1], resolution / 2 - 10, 0, Math.PI * 2);
        this.context.fill();
        this.context.closePath();
      }
      //update player by snake
      else if (currentTile.x == 50 && currentTile.y == 250) {
        this.spot = 2;
        currentTile = tiles[this.spot];
        center = currentTile.getCenter();
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.arc(center[0], center[1], resolution / 2 - 10, 0, Math.PI * 2);
        this.context.fill();
        this.context.closePath();
      }
      else if (currentTile.x == 300 && currentTile.y == 150) {
        this.spot = 13;
        currentTile = tiles[this.spot];
        center = currentTile.getCenter();
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.arc(center[0], center[1], resolution / 2 - 10, 0, Math.PI * 2);
        this.context.fill();
        this.context.closePath();
      }
      else if (currentTile.x == 100 && currentTile.y == 0) {
        this.spot = 45;
        currentTile = tiles[this.spot];
        center = currentTile.getCenter();
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.arc(center[0], center[1], resolution / 2 - 10, 0, Math.PI * 2);
        this.context.fill();
        this.context.closePath();
      }
    }
  }
  





  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <canvas
        ref={canvasRef}
        id="canvas"
        width="500"
        height="500"
        style={{ background: "rgb(0,0,0)", float: "left" }}
      ></canvas>
      <canvas
        ref={canvas1Ref}
        id="canvas1"
        width="200"
        height="300"
        style={{ background: "#000", float: "left" }}
      ></canvas>

      <button onClick={rollDice} style={{ padding: "10px 20px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px" }}>
        Roll Dice
      </button>
    </div>
  );
};

export default SnakeAndLadder;
