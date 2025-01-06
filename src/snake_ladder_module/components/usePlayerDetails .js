import { useCallback } from "react";

const usePlayerDetails = (boxSize, player1Color, player2Color, isPlayer1Turn,canvasPlayerWidth,canvasPlayerHeight) => {
  const drawPlayerDetails =  (_canvasPlayerObj) => {
        console.log("_@@@@@",_canvasPlayerObj,boxSize, player1Color, player2Color, isPlayer1Turn,canvasPlayerWidth,canvasPlayerHeight)
    //   if (!_canvasPlayerObj || !canvasPlayer) return;

      // Clear the canvas
      _canvasPlayerObj.ClearCanvas(0, 0, canvasPlayerWidth, canvasPlayerHeight);
      _canvasPlayerObj.FillText('Player 1', 20, 30, player1Color, '25px Arial');
      _canvasPlayerObj.FillCircle(150, 20, boxSize / 3, 0, 2 * Math.PI, false, player1Color);
      _canvasPlayerObj.FillText('Player 2', 20, 70, player2Color, '25px Arial');
      _canvasPlayerObj.FillCircle(150, 60, boxSize / 3, 0, 2 * Math.PI, false, player2Color);

      if (isPlayer1Turn) {
        _canvasPlayerObj.FillText('Player 2 turn', 20, 120, player2Color, '25px Arial');
      } else {
        _canvasPlayerObj.FillText('Player 1 turn', 20, 120, player1Color, '25px Arial');
      }
    }
   
  

  return { drawPlayerDetails };
};

export default usePlayerDetails;
