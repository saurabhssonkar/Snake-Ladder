import { useEffect, useCallback } from "react";


const useSnakeAndLadder = ( boxSize) => {
  // Snake and Ladder images
  const snakeImages = [new Image(), new Image(), new Image(), new Image()];
  const ladderImages = [new Image(), new Image(), new Image()];

  // Load image sources
  useEffect(() => {
    snakeImages[0].src = "/assest/snake1.png";// Replace with actual paths
    snakeImages[1].src = "/assest/snake2.png";
    snakeImages[2].src = "assest/snake3.png";
    snakeImages[3].src = "assest/snake1.png";

    ladderImages[0].src = "assest/ladder1.png";
    ladderImages[1].src = "assest/ladder1.png";
    ladderImages[2].src = "assest/ladder1.png";
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
