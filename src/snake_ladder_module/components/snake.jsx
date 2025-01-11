import React, { useEffect, useRef, useMemo } from 'react';
import { io } from "socket.io-client";
import { Canvas2dGraphics } from './canvas-module';
import LudoPawn from './LudoPawn';
import DiceRoll from './DiceRoll';
import useGameBoard from './useGameBoard';
import useDice from './useDice';
import useSnakeAndLadder from './useSnakeAndLadder';
import SnakeFooter from './SnakeFooter';
import Chat from '../../online-chat/chat';

const Snake = () => {
  const username = "saurabhssonkar";

  const socket = useMemo(
    () =>
      io("http://localhost:3000", {
        withCredentials: true,
        query: { username },
      }),
    []
  );
  const WIDTH = 500;
  const HEIGHT = 500;
  const numCol = 10;
  const numRow = 10;
  const boxSize = WIDTH / numCol;

  let isPlayer1Turn = Math.random() < 0.5;

  const canvasRef = useRef(null);
  const canvasPlayerRef = useRef(null);
  const player1 = useRef(null);
  const player2 = useRef(null);
  const canvasPlayerObjRef = useRef(null); // Add a ref for _canvasPlayerObj

  const player1Color = '#cc3399';
  const player2Color = '#66ccff';

  const { drawBoard, boxArr } = useGameBoard();
  const { drawDice } = useDice(20, 180, 100, '#fff');
  const { drawSnakesAndLadders } = useSnakeAndLadder(boxSize);

  function Player(color, playerNumber, ctx, _canvasPlayerObj, _canvasObj) {
    this.position = 0;
    this.color = color;
    this.playerNumber = playerNumber;
    this.isActive = false;
    this._canvasPlayerObj = _canvasPlayerObj;
    this._canvasObj = _canvasObj;
    this.pawn = new LudoPawn(ctx, 0, 0, color);

    this.rollDice = (r) => {
      if (!this._canvasPlayerObj) {
        console.error('CanvasPlayerObj is not initialized');
        return;
      }

      drawDice(r, this._canvasPlayerObj);

      if (r === 6) this.isActive = true;

      if (r <= boxArr().length - 1 - this.position && this.isActive) {
        const targetPosition = this.position + r;
        const interval = setInterval(() => {
          if (this.position < targetPosition) {
            this.position++;
            drawBoard(this._canvasObj);
            drawSnakesAndLadders(this._canvasObj);
            player1.current.updatePosition();
            player2.current.updatePosition();
          } else {
            clearInterval(interval);
            this.checkSpecialConditions();
          }
        }, 500);
      }

      if (this.position === boxArr().length - 1) {
        alert(`Player ${this.playerNumber} wins! Press Enter to restart.`);
      }
    };

    this.checkSpecialConditions = () => {
      // Hardcoded paths for snakes and ladders
      let specialPaths = {
        58: [43, 38, 24, 17, 18],  // Snake: 58 -> 18
        98: [83, 78, 64, 56, 46, 35, 25],  // Snake: 98 -> 25
        74: [67, 54, 48, 33],  // Snake: 74 -> 33
        6: [14, 25, 34],  // Ladder: 6 -> 34
        93: [88, 72, 69, 67, 66],  // Snake: 93 -> 66
        16: [25, 36, 46, 55],  // Ladder: 16 -> 55
        28: [33, 38, 54, 67, 71, 87]  // Ladder: 28 -> 87
      };

      // Check if the current position has a snake or ladder
      if (specialPaths[this.position] !== undefined) {
        let path = specialPaths[this.position]; // Retrieve the hardcoded path
        console.log("Path to follow:", path);

        let index = 0; // Initialize path index

        let interval = setInterval(() => {
          if (index < path.length) {
            this.position = path[index]; // Move to the next position in the path
            index++;

            drawBoard(_canvasObj); // Redraw the board
            drawSnakesAndLadders(_canvasObj); // Reload snakes and ladders
            player1.current.updatePosition(); // Update Player 1 position
            player2.current.updatePosition(); // Update Player 2 position
          } else {
            clearInterval(interval); // Stop animation when the path is complete
            console.log("Movement complete to:", this.position);
          }
        }, 400); // Adjust delay as needed for smooth animation
      }
    };

    this.updatePosition = () => {
      const currentPos = boxArr()[this.position];
      this.pawn.setPosition(
        currentPos.x + currentPos.size / 2,
        currentPos.y + currentPos.size / 2
      );
      this.pawn.draw();
    };
  }

  const drawPlayerDetails = (canvasPlayerObj, isPlayer1Turn) => {
    if (!canvasPlayerObj) {
      console.error('CanvasPlayerObj is not initialized');
      return;
    }

    canvasPlayerObj.ClearCanvas(0, 0, canvasPlayerRef.current.width, canvasPlayerRef.current.height);
    canvasPlayerObj.FillText('Player 1', 20, 30, player1Color, '25px Arial');
    canvasPlayerObj.FillCircle(150, 20, boxSize / 3, 0, 2 * Math.PI, false, player1Color);
    canvasPlayerObj.FillText('Player 2', 20, 70, player2Color, '25px Arial');
    canvasPlayerObj.FillCircle(150, 60, boxSize / 3, 0, 2 * Math.PI, false, player2Color);

    const turnText = isPlayer1Turn ? 'Player 1 turn' : 'Player 2 turn';
    canvasPlayerObj.FillText(turnText, 20, 120, isPlayer1Turn ? player1Color : player2Color, '25px Arial');
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasPlayer = canvasPlayerRef.current;

    const ctx = canvas.getContext('2d');
    const _canvasObj = new Canvas2dGraphics(canvas);
    if (_canvasObj) {
      drawBoard(_canvasObj);
      drawSnakesAndLadders(_canvasObj); // Initial draw
    }

    const _canvasPlayerObj = new Canvas2dGraphics(canvasPlayer);
    canvasPlayerObjRef.current = _canvasPlayerObj; // Store in ref

    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    canvasPlayer.width = 200;
    canvasPlayer.height = 200;

    const _player1 = new Player(player1Color, 1, ctx, _canvasPlayerObj, _canvasObj);
    const _player2 = new Player(player2Color, 2, ctx, _canvasPlayerObj, _canvasObj);
    player1.current = _player1;
    player2.current = _player2;

    // drawBoard(_canvasObj);

    setTimeout(() => {
      drawBoard(_canvasObj);
      drawSnakesAndLadders(_canvasObj);
      _player1.updatePosition();
      _player2.updatePosition();
      drawPlayerDetails(_canvasPlayerObj, isPlayer1Turn);

    }, 500)




    window.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        window.location.reload();
      }
    });

    return () => {
      // window.removeEventListener('click', handleClick);
    };
  }, []);


  const handleDiceRoll = (r) => {
    // const r = Math.floor(Math.random() * 6) + 1;
    console.log("palyer", isPlayer1Turn)

    if (player1.current && player2.current) {
      if (isPlayer1Turn) {
        player1.current.rollDice(r);
        socket.emit("playerTurn", { playerNum: "Player1", DiceDrawNum: r });
      } else {
        player2.current.rollDice(r);
        socket.emit("playerTurn", { playerNum: "Player2", DiceDrawNum: r });
      }
      isPlayer1Turn = !isPlayer1Turn;
      drawPlayerDetails(canvasPlayerObjRef.current, isPlayer1Turn);
    }
  };

  socket.on("handleDiceRoll", (playerNum, DiceDrawNum) => {
    if (playerNum === "Player1") {
      player1.current.rollDice(DiceDrawNum);
    } else if (playerNum === "Player2") {
      player2.current.rollDice(DiceDrawNum);
    }
    // setIsPlayer1Turn(playerNum === "Player1" ? false : true); // Update turn
    drawPlayerDetails(canvasPlayerObjRef.current, isPlayer1Turn);
  });



  return (
    <div className="bg-cover bg-center" style={{ backgroundImage: "url('/assest/header.jpg')" }}>
      <div className="flex flex-row gap-5 items-center justify-center " >
        <canvas ref={canvasRef} />
        <canvas ref={canvasPlayerRef} />
        <Chat />



      </div>
      <SnakeFooter onRoll={handleDiceRoll} />

    </div>



  );
};

export default Snake;

