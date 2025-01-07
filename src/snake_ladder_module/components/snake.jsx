import React, { useEffect, useRef } from 'react';
import { Canvas2dGraphics } from './canvas-module';
import LudoPawn from './LudoPawn';
import DiceRoll from './DiceRoll';
import useGameBoard from './useGameBoard';
import useDice from './useDice';
import useSnakeAndLadder from './useSnakeAndLadder';

const Snake = () => {
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

    this.rollDice = () => {
      if (!this._canvasPlayerObj) {
        console.error('CanvasPlayerObj is not initialized');
        return;
      }

      const r = Math.floor(Math.random() * 6) + 1;
      drawDice(r, this._canvasPlayerObj);

      if (r === 1) this.isActive = true;

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
        }, 300);
      }

      if (this.position === boxArr().length - 1) {
        alert(`Player ${this.playerNumber} wins! Press Enter to restart.`);
      }
    };

    this.checkSpecialConditions = () => {
      // Handle snakes and ladders logic here
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

    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    canvasPlayer.width = 300;
    canvasPlayer.height = 300;

    const _player1 = new Player(player1Color, 1, ctx, _canvasPlayerObj, _canvasObj);
    const _player2 = new Player(player2Color, 2, ctx, _canvasPlayerObj, _canvasObj);
    player1.current = _player1;
    player2.current = _player2;

    drawBoard(_canvasObj);
    _player1.updatePosition();
    _player2.updatePosition();
    drawPlayerDetails(_canvasPlayerObj, isPlayer1Turn);

    const handleClick = () => {
      if (_player1 && _player2) {
        if (isPlayer1Turn) {
          _player1.rollDice();
        } else {
          _player2.rollDice();
        }
        isPlayer1Turn = !isPlayer1Turn;
        drawPlayerDetails(_canvasPlayerObj, isPlayer1Turn);
      }
    };

    window.addEventListener('click', handleClick);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        window.location.reload();
      }
    });

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  // useEffect(() => {
  //   // Set up WebSocket connection
  //   const socket = new WebSocket('ws://localhost:8080');
  //   setWs(socket);

  //   socket.onopen = () => {
  //     console.log('WebSocket connection established');
  //   };

  //   socket.onmessage = (message) => {
  //     // Handle incoming messages
  //     const data = JSON.parse(message.data);
  //     if (data.type === 'turn') {
  //       // Update the turn and player state based on the message
  //       isPlayer1Turn = data.isPlayer1Turn;
  //       drawPlayerDetails(canvasPlayerRef.current, isPlayer1Turn);
  //     }
  //     // Handle other game state changes
  //   };
  // },[])

  return (
    <div className="canv">
      <canvas ref={canvasRef} />
      <canvas ref={canvasPlayerRef} style={{ background: '#000', float: 'left' }} />
      <DiceRoll />
    </div>
  );
};

export default Snake;
