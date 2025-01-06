import React from 'react'
import { useEffect } from 'react'
import { Canvas2dGraphics } from './canvas-module';
import snake_4 from "../../assest/snake1.png"
import snake_5 from "../../assest/snake2.png"
import snake_6 from "../../assest/snake3.png"
import ladder_1 from "../../assest/ladder1.png"
import LudoPawn from './LudoPawn';
import DiceRoll from './DiceRoll';


const Snake = () => {

  useEffect(() => {
    const canvas = document.getElementById('canvas')
   const ctx = canvas.getContext('2d');
  const _canvasObj = new Canvas2dGraphics(canvas);
      
      const WIDTH = 500;
      const HEIGHT = 500;
      const numCol = 10;
      const numRow = 10;
      const boxSize = WIDTH / numCol;
      const player1Color = "#cc3399";
      const player2Color = '#66ccff';
      const canvasPlayer = document.createElement('canvas');
      const _canvasPlayerObj = new Canvas2dGraphics(canvasPlayer);

    //Variables
    var boxArr = [];
      var x = 0;
      var y = (numRow - 1) * boxSize;
      var dir = 1 ,
      snake1 = new Image(),
       snake2 = new Image(),
       snake3 = new Image(),
       snake4 = new Image(),
       ladder1 = new Image(),
       ladder2 = new Image(),
       ladder3 = new Image();
      const player1 = new Player(player1Color, 1,ctx);
      const player2 = new Player(player2Color, 2,ctx);
      var  isPlayer1Turn = Math.random() < 0.5 ? false : true;
      
      const dice = new Dice(20, 180, 100, '#fff');
      

     snake1.src = snake_4;
     snake2.src = snake_6;
     snake3.src = snake_5;
     snake4.src = snake_4;
     ladder1.src = ladder_1;
     ladder2.src = ladder_1;
     ladder3.src = ladder_1;


     canvas.width = WIDTH;
     canvas.height = HEIGHT;
     canvasPlayer.width = 300;
     canvasPlayer.height = 300;
     canvasPlayer.style.background = '#000';
     canvasPlayer.style.float = 'left';
     document.body.appendChild(canvasPlayer);

    for (let i = 0; i < numCol * numRow; i++) {
      boxArr.push(new Box(x, y, boxSize, i));
      x = x + boxSize * dir;
      if (x >= WIDTH || x <= -boxSize) {
        dir *= -1;
        x += boxSize * dir;
        y -= boxSize;
      }
      // console.log("boxarray",boxArr)
    }

    window.addEventListener('click', playGame);
    window.addEventListener('keydown', (e) => {
      if (e.keyCode == 13) {
        window.location.reload();
      }
    });


   // palyer draw for 1 and 2 dice detail
    function drawPlayerDetails() {
      _canvasPlayerObj.ClearCanvas(0, 0, canvasPlayer.width, canvasPlayer.height);
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

    //function Dice
    function Dice(x, y, size, color) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.color = color;

      this.drawDice = function (n) {
        _canvasPlayerObj.StrokeRectangle(this.x, this.y, this.size, this.size, this.color);
        switch (n) {
          case 1:
            _canvasPlayerObj.FillCircle(this.x + this.size / 2, this.y + this.size / 2, 10, 0, 2 * Math.PI, false, this.color);
            break;
          case 2:
            _canvasPlayerObj.FillCircle(this.x + this.size / 4, this.y + this.size / 4, 10, 0, 2 * Math.PI, false, this.color);
            _canvasPlayerObj.FillCircle(this.x + 3 * this.size / 4, this.y + 3 * this.size / 4, 10, 0, 2 * Math.PI, false, this.color);
            break;
          case 3:
            _canvasPlayerObj.FillCircle(this.x + this.size / 4, this.y + this.size / 4, 10, 0, 2 * Math.PI, false, this.color);
            _canvasPlayerObj.FillCircle(this.x + 3 * this.size / 4, this.y + 3 * this.size / 4, 10, 0, 2 * Math.PI, false, this.color);
            _canvasPlayerObj.FillCircle(this.x + this.size / 2, this.y + this.size / 2, 10, 0, 2 * Math.PI, false, this.color);
            break;
          case 4:
            _canvasPlayerObj.FillCircle(this.x + this.size / 4, this.y + this.size / 4, 10, 0, 2 * Math.PI, false, this.color);
            _canvasPlayerObj.FillCircle(this.x + 3 * this.size / 4, this.y + this.size / 4, 10, 0, 2 * Math.PI, false, this.color);
            _canvasPlayerObj.FillCircle(this.x + this.size / 4, this.y + 3 * this.size / 4, 10, 0, 2 * Math.PI, false, this.color);
            _canvasPlayerObj.FillCircle(this.x + 3 * this.size / 4, this.y + 3 * this.size / 4, 10, 0, 2 * Math.PI, false, this.color);
            break;
          case 5:
            _canvasPlayerObj.FillCircle(this.x + this.size / 4, this.y + this.size / 4, 10, 0, 2 * Math.PI, false, this.color);
            _canvasPlayerObj.FillCircle(this.x + 3 * this.size / 4, this.y + this.size / 4, 10, 0, 2 * Math.PI, false, this.color);
            _canvasPlayerObj.FillCircle(this.x + this.size / 4, this.y + 3 * this.size / 4, 10, 0, 2 * Math.PI, false, this.color);
            _canvasPlayerObj.FillCircle(this.x + 3 * this.size / 4, this.y + 3 * this.size / 4, 10, 0, 2 * Math.PI, false, this.color);
            _canvasPlayerObj.FillCircle(this.x + this.size / 2, this.y + this.size / 2, 10, 0, 2 * Math.PI, false, this.color);

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

    //function play game
    function playGame() {
      if (isPlayer1Turn) {
        drawBoard();
        loadSnakeAndLadder();
        player1.rollDice();
        player1.drawPlayer();
        player2.drawPlayer();
        isPlayer1Turn = false;
      } else {
        drawBoard();
        loadSnakeAndLadder();
        player2.rollDice();
        player1.drawPlayer();
        player2.drawPlayer();
        isPlayer1Turn = true;
      }
    }
    //Player function
    function Player(color, playerNumber,ctx) {
      console.log("ctx",ctx)

      this.position = 0;
      this.color = color;
      this.playerNumber = playerNumber;
      this.isActive = false;
      this.pawn = new LudoPawn(ctx, 0, 0, color); // Create LudoPawn instance

      this.rollDice = function () {
        drawPlayerDetails();
        let r = Math.floor(Math.random() * 6) + 1;//1 to 6;
        console.log(isPlayer1Turn)
        console.log("r value",r)
        dice.drawDice(r);
        if (r == 1) {
          this.isActive = true;
        }
        if (r <= (boxArr.length - 1) - this.position && this.isActive) {
         
          let targetPosition = this.position + r;
          console.log("run",this.position , targetPosition)
          // this.position += r;

          let interval = setInterval(() => {
            if (this.position < targetPosition) {
              console.log(" simple postion",this.position)
              this.position++;
              drawBoard(); 
              loadSnakeAndLadder(); 
              player1.drawPlayer(); 
              player2.drawPlayer(); 
            } else {
              clearInterval(interval); // Stop animation when target reached
             this.checkSpecialConditions(); // Check for snakes or ladders
            }
          }, 300);
        }
        //Check if player wins
        if (this.position == boxArr.length - 1) {
          alert('Player ' + this.playerNumber + 'wins!!!\nPlease press enter to restart the game.');
        }
      };

      this.checkSpecialConditions = () => {
        // Hardcoded paths for snakes and ladders
        let specialPaths = {
            58: [43, 38, 24, 17, 18],  // Snake: 58 -> 18
            98: [83, 78, 64, 56, 46, 35, 25],  // Snake: 98 -> 25
            74: [67, 54, 48, 33],  // Snake: 74 -> 33
            6: [13, 26, 34],  // Ladder: 6 -> 34
            93: [88, 72, 69, 67, 66],  // Snake: 93 -> 66
            16: [25, 36, 46, 55],  // Ladder: 16 -> 55
            28: [33, 38, 54, 67, 71, 87]  // Ladder: 28 -> 87
        };
    
        // Check if the current position has a snake or ladder
        if (specialPaths[this.position] !== undefined) {
            let path = specialPaths[this.position]; // Retrieve the hardcoded path
            console.log("Path to follow:", path);
    
            let index = 0; // Initialize path index
    
            let interval = setInterval(() => {
                if (index < path.length) {
                    this.position = path[index]; // Move to the next position in the path
                    index++;
    
                    drawBoard(); // Redraw the board
                    loadSnakeAndLadder(); // Reload snakes and ladders
                    player1.drawPlayer(); // Update Player 1 position
                    player2.drawPlayer(); // Update Player 2 position
                } else {
                    clearInterval(interval); // Stop animation when the path is complete
                    console.log("Movement complete to:", this.position);
                }
            }, 3000); // Adjust delay as needed for smooth animation
        }
    };
    
    

      this.drawPlayer = function () {
        let currentPos = boxArr[this.position];

        this.pawn.setPosition(
          currentPos.x + currentPos.size / 2,
          currentPos.y + currentPos.size / 2
        );
        this.pawn.draw();
       
        // _canvasObj.FillCircle(currentPos.x + currentPos.size / 2, currentPos.y + currentPos.size / 2, boxSize / 3, 0, 2 * Math.PI, false, this.color);


      };


    }
    //function to draw image of snake and ladder
    function loadSnakeAndLadder() {
      _canvasObj.DrawImageWH(snake1, boxSize * 1, boxSize * 4, 100, 250);
      _canvasObj.DrawImageWH(snake2, boxSize * 1, 0, 230, 400);
      _canvasObj.DrawImageWH(snake3, boxSize * 5, boxSize * 2, 100, 250);
      _canvasObj.DrawImageWH(snake4, boxSize * 6, 0, 100, 200);
      _canvasObj.Save();
      _canvasObj.Rotate(0.25);
      _canvasObj.DrawImageWH(ladder1, boxSize * 5, boxSize * 3, 30, 220);
      _canvasObj.Restore();
      _canvasObj.Save();
      _canvasObj.Rotate(-0.15);
      _canvasObj.DrawImageWH(ladder2, boxSize * 7, boxSize * 2.5, 30, 320);
      _canvasObj.Restore();
      _canvasObj.Save();
      _canvasObj.Rotate(-0.2);
      _canvasObj.DrawImageWH(ladder3, boxSize * 4, boxSize * 7, 30, 170);
      _canvasObj.Restore();
    }
    //function box
    function Box(x, y, size, index) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.index = index;

      if (this.index % 4 == 1) {
        this.color = '#f00';
      } else if (this.index % 4 == 2) {
        this.color = '#0f0';
      } else if (this.index % 4 == 3) {
        this.color = '#00f';
      } else if (this.index % 4 == 0) {
        this.color = '#fff';
      } else {
        this.color = '#ffd633';
      }
    }

    Box.prototype.drawBox = function () {
      _canvasObj.FillRectangle(this.x, this.y, this.size, this.size, this.color);
      _canvasObj.FillText(this.index + 1, this.x + this.size / 1.5, this.y + this.size / 4, '#0E0E0E', '12px Arial');
    }

    function drawBoard() {
      boxArr.forEach((b) => {
        b.drawBox();
      });
    }

    window.onload = function () {
      drawBoard();
      loadSnakeAndLadder();
      player1.drawPlayer();
      player2.drawPlayer();
      drawPlayerDetails();
    }





  }, [])
  return (
    <div className='canv'>
    
          <canvas id="canvas"></canvas>
          <DiceRoll/>


    </div>
  )
}

export default Snake