// // Player.js
// import LudoPawn from './LudoPawn';
// import useGameBoard from './useGameBoard';
// import useDice from './useDice';

// class Player {
//   constructor(color, playerNumber, ctx, _canvasPlayerObj, boxArr) {
//     this.position = 0;
//     this.color = color;
//     this.playerNumber = playerNumber;
//     this.isActive = false;
//     this._canvasPlayerObj = _canvasPlayerObj;
//     this.pawn = new LudoPawn(ctx, 0, 0, color);
//     this.boxArr = boxArr; // Store boxArr for later use
//   }

//   rollDice(drawPlayerDetails, drawBoard, drawSnakesAndLadders) {
//     drawPlayerDetails();
//     let r = Math.floor(Math.random() * 6) + 1; // 1 to 6
//     console.log("r value", r);
//     drawDice(r, this._canvasPlayerObj);
//     if (r === 1) {
//       this.isActive = true;
//     }
//     if (r <= (this.boxArr().length - 1) - this.position && this.isActive) {
//       let targetPosition = this.position + r;
//       console.log("run", this.position, targetPosition);

//       let interval = setInterval(() => {
//         if (this.position < targetPosition) {
//           console.log("simple position", this.position);
//           this.position++;
//           drawBoard(); 
//           drawSnakesAndLadders(); 
//         } else {
//           clearInterval(interval); // Stop animation when target reached
//           this.checkSpecialConditions(drawBoard, drawSnakesAndLadders);
//         }
//       }, 300);
//     }
//     // Check if player wins
//     if (this.position === this.boxArr().length - 1) {
//       alert('Player ' + this.playerNumber + ' wins!!!\nPlease press enter to restart the game.');
//     }
//   }

//   checkSpecialConditions(drawBoard, drawSnakesAndLadders) {
//     // Hardcoded paths for snakes and ladders
//     let specialPaths = {
//       58: [43, 38, 24, 17, 18],  // Snake: 58 -> 18
//       98: [83, 78, 64, 56, 46, 35, 25],  // Snake: 98 -> 25
//       74: [67, 54, 48, 33],  // Snake: 74 -> 33
//       6: [13, 26, 34],  // Ladder: 6 -> 34
//       93: [88, 72, 69, 67, 66],  // Snake: 93 -> 66
//       16: [25, 36, 46, 55],  // Ladder: 16 -> 55
//       28: [33, 38, 54, 67, 71, 87]  // Ladder: 28 -> 87
//     };

//     // Check if the current position has a snake or ladder
//     if (specialPaths[this.position] !== undefined) {
//       let path = specialPaths[this.position]; // Retrieve the hardcoded path
//       console.log("Path to follow:", path);

//       let index = 0; // Initialize path index

//       let interval = setInterval(() => {
//         if (index < path.length) {
//           this.position = path[index]; // Move to the next position in the path
//           index++;

//           drawBoard(); // Redraw the board
//           drawSnakesAndLadders(); // Reload snakes and ladders
//         } else {
//           clearInterval(interval); // Stop animation when the path is complete
//           console.log("Movement complete to:", this.position);
//         }
//       }, 3000); // Adjust delay as needed for smooth animation
//     }
//   }

//   PlayerDicePostion(boxArr) {
//     let currentPos = boxArr()[this.position];

//     this.pawn.setPosition(
//       currentPos.x + currentPos.size / 2,
//       currentPos.y + currentPos.size / 2
//     );
//     this.pawn.draw();
//   }
// }

// export default Player;