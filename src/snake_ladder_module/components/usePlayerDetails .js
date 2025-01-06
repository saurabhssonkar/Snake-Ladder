import { useCallback } from "react";

const usePlayerDetails = (boxSize, player1Color, player2Color, isPlayer1Turn,canvasPlayerWidth,canvasPlayerHeight) => {
  const drawPlayerDetails = useCallback(
    (_canvasPlayerObj, canvasPlayer) => {
      if (!_canvasPlayerObj || !canvasPlayer) return;

      // Clear the canvas
      _canvasPlayerObj.ClearCanvas(0, 0, canvasPlayerWidth, canvasPlayerHeight);

      // Draw Player 1 details
      _canvasPlayerObj.FillText("Player 1", 20, 30, player1Color, "25px Arial");
      _canvasPlayerObj.FillCircle(150, 20, boxSize / 3, 0, 2 * Math.PI, false, player1Color);

      // Draw Player 2 details
      _canvasPlayerObj.FillText("Player 2", 20, 70, player2Color, "25px Arial");
      _canvasPlayerObj.FillCircle(150, 60, boxSize / 3, 0, 2 * Math.PI, false, player2Color);

      // Indicate the current player's turn
      if (isPlayer1Turn) {
        _canvasPlayerObj.FillText("Player 2 turn", 20, 120, player2Color, "25px Arial");
      } else {
        _canvasPlayerObj.FillText("Player 1 turn", 20, 120, player1Color, "25px Arial");
      }
    },
    [boxSize, player1Color, player2Color, isPlayer1Turn]
  );

  return { drawPlayerDetails };
};

export default usePlayerDetails;
