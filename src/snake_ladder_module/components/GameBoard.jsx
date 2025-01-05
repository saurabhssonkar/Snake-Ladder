import React, { useEffect, useRef } from "react";
import snak from "../assest/snak.png"
import ladder from "../assest/loader.png"
import snake from "../assest/snake.png"
import bigsnake from "../assest/bigsnake.png"
import straight from "../assest/snakesatraight.png"

const GameBoard = ({ players, snakes, ladders }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const tileSize = 50;
    const boardSize = tileSize * 10;

    const snakeImg = new Image();
    const ladderImg = new Image();

    snakeImg.src =straight;
    ladderImg.src = ladder; // Path to ladder image

    // Draw the Board
    const drawBoard = () => {
      const colors = ["#FFD700", "#FF4500"];
      ctx.clearRect(0, 0, boardSize, boardSize);

      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
          const x = col * tileSize;
          const y = row * tileSize;
          const color = colors[(row + col) % 2];
          ctx.fillStyle = color;
          ctx.fillRect(x, y, tileSize, tileSize);

          const number =
            row % 2 === 0
              ? 100 - (row * 10 + col)
              : 100 - (row * 10 + (9 - col));
          ctx.fillStyle = "#000";
          ctx.font = "bold 14px Arial";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(number, x + tileSize / 2, y + tileSize / 2);
        }
      }
    };

    // Draw Snakes
    const drawSnakes = () => {
      snakes.forEach((snake) => {
        const { from, to } = snake;
        const startPos = getTilePosition(from);
        const endPos = getTilePosition(to);

        ctx.drawImage(snakeImg, startPos.x, startPos.y, tileSize, tileSize * 1.5);
        ctx.drawImage(snakeImg, endPos.x, endPos.y, tileSize, tileSize * 1.5);
      });
    };
    

    // Draw Ladders
    const drawLadders = () => {
      ladders.forEach((ladder) => {
        const { from, to } = ladder;
        const startPos = getTilePosition(from);
        const endPos = getTilePosition(to);

        ctx.drawImage(
          ladderImg,
          startPos.x,
          startPos.y,
          tileSize,
          tileSize * 1.5
        );
        ctx.drawImage(
          ladderImg,
          endPos.x,
          endPos.y,
          tileSize,
          tileSize * 1.5
        );
      });
    };

    // Helper to get tile position
    const getTilePosition = (tile) => {
      const row = Math.floor((tile - 1) / 10);
      const col = row % 2 === 0 ? (tile - 1) % 10 : 9 - ((tile - 1) % 10);
      return { x: col * tileSize, y: 450 - row * tileSize };
    };

    // Draw Players
    const drawPlayers = () => {
      players.forEach((player) => {
        const position = getTilePosition(player.position);
        ctx.beginPath();
        ctx.arc(
          position.x + tileSize / 2,
          position.y + tileSize / 2,
          10,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = player.color;
        ctx.fill();
      });
    };

    // Render Everything
    snakeImg.onload = () => {
      ladderImg.onload = () => {
        drawBoard();
        drawSnakes();
        drawLadders();
        drawPlayers();
      };
    };
  }, [players, snakes, ladders]);

  return <canvas ref={canvasRef} width={500} height={500} className="border" />;
};

export default GameBoard;
