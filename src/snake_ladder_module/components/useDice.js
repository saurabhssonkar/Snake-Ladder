import { useRef } from 'react';

const useDice = (x = 20, y = 180, size = 100, color = '#fff') => {
  const diceRef = useRef(null);

  // Dice class definition
  class Dice {
    constructor(x, y, size, color) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.color = color;
    }

    drawDice(n,_canvasPlayerObj) {
      if (!_canvasPlayerObj) return;

      // Draw the outer rectangle for the dice
      _canvasPlayerObj.StrokeRectangle(this.x, this.y, this.size, this.size, this.color);

      // Draw dots based on the number
      switch (n) {
        case 1:
          _canvasPlayerObj.FillCircle(
            this.x + this.size / 2,
            this.y + this.size / 2,
            10,
            0,
            2 * Math.PI,
            false,
            this.color
          );
          break;
        case 2:
          _canvasPlayerObj.FillCircle(
            this.x + this.size / 4,
            this.y + this.size / 4,
            10,
            0,
            2 * Math.PI,
            false,
            this.color
          );
          _canvasPlayerObj.FillCircle(
            this.x + (3 * this.size) / 4,
            this.y + (3 * this.size) / 4,
            10,
            0,
            2 * Math.PI,
            false,
            this.color
          );
          break;
        case 3:
          _canvasPlayerObj.FillCircle(
            this.x + this.size / 4,
            this.y + this.size / 4,
            10,
            0,
            2 * Math.PI,
            false,
            this.color
          );
          _canvasPlayerObj.FillCircle(
            this.x + (3 * this.size) / 4,
            this.y + (3 * this.size) / 4,
            10,
            0,
            2 * Math.PI,
            false,
            this.color
          );
          _canvasPlayerObj.FillCircle(
            this.x + this.size / 2,
            this.y + this.size / 2,
            10,
            0,
            2 * Math.PI,
            false,
            this.color
          );
          break;
        case 4:
          _canvasPlayerObj.FillCircle(
            this.x + this.size / 4,
            this.y + this.size / 4,
            10,
            0,
            2 * Math.PI,
            false,
            this.color
          );
          _canvasPlayerObj.FillCircle(
            this.x + (3 * this.size) / 4,
            this.y + this.size / 4,
            10,
            0,
            2 * Math.PI,
            false,
            this.color
          );
          _canvasPlayerObj.FillCircle(
            this.x + this.size / 4,
            this.y + (3 * this.size) / 4,
            10,
            0,
            2 * Math.PI,
            false,
            this.color
          );
          _canvasPlayerObj.FillCircle(
            this.x + (3 * this.size) / 4,
            this.y + (3 * this.size) / 4,
            10,
            0,
            2 * Math.PI,
            false,
            this.color
          );
          break;
        case 5:
          _canvasPlayerObj.FillCircle(
            this.x + this.size / 4,
            this.y + this.size / 4,
            10,
            0,
            2 * Math.PI,
            false,
            this.color
          );
          _canvasPlayerObj.FillCircle(
            this.x + (3 * this.size) / 4,
            this.y + this.size / 4,
            10,
            0,
            2 * Math.PI,
            false,
            this.color
          );
          _canvasPlayerObj.FillCircle(
            this.x + this.size / 4,
            this.y + (3 * this.size) / 4,
            10,
            0,
            2 * Math.PI,
            false,
            this.color
          );
          _canvasPlayerObj.FillCircle(
            this.x + (3 * this.size) / 4,
            this.y + (3 * this.size) / 4,
            10,
            0,
            2 * Math.PI,
            false,
            this.color
          );
          _canvasPlayerObj.FillCircle(
            this.x + this.size / 2,
            this.y + this.size / 2,
            10,
            0,
            2 * Math.PI,
            false,
            this.color
          );
          break;
        default:
            _canvasPlayerObj.FillCircle(this.x + this.size / 8 + 10, this.y + this.size / 4, 10, 0, 2 * Math.PI, false, this.color);
            _canvasPlayerObj.FillCircle(this.x + 3 * this.size / 8 + 10, this.y + this.size / 4, 10, 0, 2 * Math.PI, false, this.color);
            _canvasPlayerObj.FillCircle(this.x + 5 * this.size / 8 + 10, this.y + this.size / 4, 10, 0, 2 * Math.PI, false, this.color);
            _canvasPlayerObj.FillCircle(this.x + 1 * this.size / 8 + 10, this.y + 3 * this.size / 4, 10, 0, 2 * Math.PI, false, this.color);
            _canvasPlayerObj.FillCircle(this.x + 3 * this.size / 8 + 10, this.y + 3 * this.size / 4, 10, 0, 2 * Math.PI, false, this.color);
            _canvasPlayerObj.FillCircle(this.x + 5 * this.size / 8 + 10, this.y + 3 * this.size / 4, 10, 0, 2 * Math.PI, false, this.color);

          break;
      }
    }
  }

  // Initialize dice
  if (!diceRef.current) {
    diceRef.current = new Dice(x, y, size, color);
  }

  return {
    drawDice: (n) => diceRef.current?.drawDice(n),
  };
};

export default useDice;
