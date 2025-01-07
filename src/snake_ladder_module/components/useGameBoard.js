import { useRef } from 'react';

const useGameBoard = (numCol = 10, numRow = 10, boxSize = 50, canvasWidth = 500) => {
  const boxArr = useRef([]);

  // Initialize the board
  const initializeBoard = () => {
    boxArr.current = [];
    let x = 0;
    let y = (numRow - 1) * boxSize;
    let dir = 1;

    for (let i = 0; i < numCol * numRow; i++) {
      const box = new Box(x, y, boxSize, i);
      boxArr.current.push(box);

      x += boxSize * dir;
      if (x >= canvasWidth || x <= -boxSize) {
        dir *= -1;
        x += boxSize * dir;
        y -= boxSize;
      }
    }
  };

  // Box class definition
  function Box(x, y, size, index) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.index = index;

    // Assign colors based on the index
    if (this.index % 4 === 1) {
      this.color = '#f00';
    } else if (this.index % 4 === 2) {
      this.color = '#0f0';
    } else if (this.index % 4 === 3) {
      this.color = '#00f';
    } else {
      this.color = '#fff';
    }
  }

  // Add a drawBox method to the prototype
  Box.prototype.drawBox = function (_canvasObj) {
    _canvasObj.FillRectangle(this.x, this.y, this.size, this.size, this.color);
    _canvasObj.FillText(
      this.index + 1,
      this.x + this.size / 1.5,
      this.y + this.size / 4,
      '#0E0E0E',
      '12px Arial'
    );
  };

  // drawBoard function to render the boxes
  const drawBoard = (_canvasObj) => {
    // alert(_canvasObj)
    if (boxArr.current.length === 0) {
      initializeBoard(); // Initialize the board only when needed
    }
    boxArr.current.forEach((box) => box.drawBox(_canvasObj));
  };

  const getBoxArray = () => boxArr.current;

  return { drawBoard, boxArr: getBoxArray };
};

export default useGameBoard;
