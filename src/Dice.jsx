import React, { useRef, useEffect, useState } from "react";

const Dice = () => {
  const canvasRef = useRef(null);
  const [diceValue, setDiceValue] = useState(1); // Current dice face

  const diceSize = 100; // Size of the dice
  const dotSize = 10; // Size of the dots

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Draw the dice face
    const drawDice = (value) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw dice background
      ctx.fillStyle = "#fff";
      ctx.fillRect(
        (canvas.width - diceSize) / 2,
        (canvas.height - diceSize) / 2,
        diceSize,
        diceSize
      );

      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.strokeRect(
        (canvas.width - diceSize) / 2,
        (canvas.height - diceSize) / 2,
        diceSize,
        diceSize
      );

      // Get center position
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const offset = diceSize / 4;

      // Draw dots for the current value
      ctx.fillStyle = "#000";

      const drawDot = (x, y) => {
        ctx.beginPath();
        ctx.arc(x, y, dotSize, 0, Math.PI * 2);
        ctx.fill();
      };

      // Positions for each dice face
      const diceDots = {
        1: [[centerX, centerY]],
        2: [
          [centerX - offset, centerY - offset],
          [centerX + offset, centerY + offset],
        ],
        3: [
          [centerX - offset, centerY - offset],
          [centerX, centerY],
          [centerX + offset, centerY + offset],
        ],
        4: [
          [centerX - offset, centerY - offset],
          [centerX + offset, centerY - offset],
          [centerX - offset, centerY + offset],
          [centerX + offset, centerY + offset],
        ],
        5: [
          [centerX - offset, centerY - offset],
          [centerX + offset, centerY - offset],
          [centerX, centerY],
          [centerX - offset, centerY + offset],
          [centerX + offset, centerY + offset],
        ],
        6: [
          [centerX - offset, centerY - offset],
          [centerX + offset, centerY - offset],
          [centerX - offset, centerY],
          [centerX + offset, centerY],
          [centerX - offset, centerY + offset],
          [centerX + offset, centerY + offset],
        ],
      };

      diceDots[value].forEach(([x, y]) => drawDot(x, y));
    };

    drawDice(diceValue); // Initial render
  }, [diceValue]);

  // Handle dice animation and rolling
  const rollDice = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let rotation = 0;
    const duration = 1000; // Animation duration in ms
    const startTime = performance.now();

    const newDiceValue = Math.floor(Math.random() * 6) + 1; // New random value

    const animate = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1); // Animation progress (0 to 1)

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Save and apply rotation
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((Math.PI * 2 * progress) + rotation); // Smooth rotation
      ctx.translate(-canvas.width / 2, -canvas.height / 2);

      // Draw the dice face
      ctx.fillStyle = "#fff";
      ctx.fillRect(
        (canvas.width - diceSize) / 2,
        (canvas.height - diceSize) / 2,
        diceSize,
        diceSize
      );

      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.strokeRect(
        (canvas.width - diceSize) / 2,
        (canvas.height - diceSize) / 2,
        diceSize,
        diceSize
      );

      ctx.restore();

      if (progress < 1) {
        requestAnimationFrame(animate); // Continue animation
      } else {
        setDiceValue(newDiceValue); // Set the final dice value
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={200}
        height={200}
        style={{ border: "1px solid #000", cursor: "pointer" }}
        onClick={rollDice}
      />
      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Click the dice to roll!
      </p>
    </div>
  );
};

export default Dice;
