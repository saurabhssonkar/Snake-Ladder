import { useEffect, useCallback } from "react";
import snake_4 from "../../assest/snake1.png"
import snake_5 from "../../assest/snake2.png"
import snake_6 from "../../assest/snake3.png"
import ladder_1 from "../../assest/ladder1.png"

const useSnakeAndLadder = ( boxSize) => {
  // Snake and Ladder images
  const snakeImages = [new Image(), new Image(), new Image(), new Image()];
  const ladderImages = [new Image(), new Image(), new Image()];

  // Load image sources
  useEffect(() => {
    snakeImages[0].src = snake_4;// Replace with actual paths
    snakeImages[1].src = snake_5;
    snakeImages[2].src = snake_6;
    snakeImages[3].src = snake_4;

    ladderImages[0].src = ladder_1;
    ladderImages[1].src = ladder_1;
    ladderImages[2].src = ladder_1;
  }, []);

  // Function to draw snakes and ladders
  const drawSnakesAndLadders = useCallback((_canvasObj) => {
    console.log("_canvasObj!!",_canvasObj)
    if (!_canvasObj) return;

    // Draw snakes
    _canvasObj.DrawImageWH(snakeImages[0], boxSize * 1, boxSize * 4, 100, 250);
    _canvasObj.DrawImageWH(snakeImages[1], boxSize * 1, 0, 230, 400);
    _canvasObj.DrawImageWH(snakeImages[2], boxSize * 5, boxSize * 2, 100, 250);
    _canvasObj.DrawImageWH(snakeImages[3], boxSize * 6, 0, 100, 200);

    // Draw ladders
    _canvasObj.Save();
    _canvasObj.Rotate(0.25);
    _canvasObj.DrawImageWH(ladderImages[0], boxSize * 5, boxSize * 3, 30, 220);
    _canvasObj.Restore();

    _canvasObj.Save();
    _canvasObj.Rotate(-0.15);
    _canvasObj.DrawImageWH(ladderImages[1], boxSize * 7, boxSize * 2.5, 30, 320);
    _canvasObj.Restore();

    _canvasObj.Save();
    _canvasObj.Rotate(-0.2);
    _canvasObj.DrawImageWH(ladderImages[2], boxSize * 4, boxSize * 7, 30, 170);
    _canvasObj.Restore();
  }, [ boxSize, snakeImages, ladderImages]);

  return { drawSnakesAndLadders };
};

export default useSnakeAndLadder
