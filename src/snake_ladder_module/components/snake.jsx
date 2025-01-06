import React from 'react'
import { useEffect } from 'react'
import { Canvas2dGraphics } from './canvas-module';
import LudoPawn from './LudoPawn';
import DiceRoll from './DiceRoll';
import useGameBoard from './useGameBoard';
import useDice from './useDice';
import useSnakeAndLadder from './useSnakeAndLadder';
import usePlayerDetails from './usePlayerDetails ';


const Snake = () => {
  const WIDTH = 500;
  const HEIGHT = 500;
  const numCol = 10;
  const numRow = 10;
  const boxSize = WIDTH / numCol;
  var  isPlayer1Turn = Math.random() < 0.5 ? false : true;
  let count = 0;
  console.log("cout",count)

  const player1Color = "#cc3399";
  const player2Color = '#66ccff';
  const canvasPlayer = document.createElement('canvas');
  canvasPlayer.width = 300;
  canvasPlayer.height = 300;
  // console.log("!!!!!",canvasPlayer.width)

 
  const {drawBoard ,boxArr} = useGameBoard();
 const { drawDice } = useDice(20, 180, 100, '#fff');
 const {drawSnakesAndLadders} = useSnakeAndLadder(boxSize)
  //  const{drawPlayerDetails} = usePlayerDetails(boxSize,player1Color,player2Color,isPlayer1Turn,canvasPlayer.width ,canvasPlayer.height);

  // console.log("boxArr",boxArr())


  useEffect(() => {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d');
   const _canvasObj = new Canvas2dGraphics(canvas);
    const canvasPlayer = document.createElement('canvas');
    const _canvasPlayerObj = new Canvas2dGraphics(canvasPlayer,boxSize)
     
    
     

    
     
    
      const player1 = new Player(player1Color, 1,ctx,_canvasPlayerObj);
      const player2 = new Player(player2Color, 2,ctx ,_canvasPlayerObj);
      
      

    


     canvas.width = WIDTH;
     canvas.height = HEIGHT;
     canvasPlayer.width = 300;
     canvasPlayer.height = 300;
     canvasPlayer.style.background = '#000';
     canvasPlayer.style.float = 'left';
     document.body.appendChild(canvasPlayer);

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

    

    //function play game
    function playGame() {
      if (isPlayer1Turn) {
        drawBoard(_canvasObj);
        drawSnakesAndLadders(_canvasObj);
        player1.rollDice();
        player1.drawPlayer();
        player2.drawPlayer();
        isPlayer1Turn = false;
      } else {
        drawBoard(_canvasObj);
        drawSnakesAndLadders(_canvasObj);
        player2.rollDice();
        player1.drawPlayer();
        player2.drawPlayer();
        isPlayer1Turn = true;
      }
    }
    //Player function
    function Player(color, playerNumber,ctx,_canvasPlayerObj) {
      // console.log("ctx",ctx)

      this.position = 0;
      this.color = color;
      this.playerNumber = playerNumber;
      this.isActive = false;
      this._canvasPlayerObj = _canvasPlayerObj
      this.pawn = new LudoPawn(ctx, 0, 0, color); // Create LudoPawn instance

      this.rollDice = function () {
        drawPlayerDetails();
        let r = Math.floor(Math.random() * 6) + 1;//1 to 6;
        // console.log(isPlayer1Turn)
        console.log("r value",r)
        drawDice(r,this._canvasPlayerObj);
        if (r == 1) {
          this.isActive = true;
          
        }
        if (r <= (boxArr().length - 1) - this.position && this.isActive) {
         
          let targetPosition = this.position + r;
          console.log("run",this.position , targetPosition)
          // this.position += r;

          let interval = setInterval(() => {
            if (this.position < targetPosition) {
              console.log(" simple postion",this.position)
              this.position++;
              drawBoard(_canvasObj); 
              drawSnakesAndLadders(_canvasObj); 
              player1.drawPlayer(); 
              player2.drawPlayer(); 
            } else {
              clearInterval(interval); // Stop animation when target reached
             this.checkSpecialConditions(); // Check for snakes or ladders
            }
          }, 300);
        }
        //Check if player wins
        if (this.position == boxArr().length - 1) {
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
    
                    drawBoard(_canvasObj); // Redraw the board
                    drawSnakesAndLadders(_canvasObj); // Reload snakes and ladders
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
        let currentPos = boxArr()[this.position];

        this.pawn.setPosition(
          currentPos.x + currentPos.size / 2,
          currentPos.y + currentPos.size / 2
        );
        this.pawn.draw();
       
       


      };


    }
   


    window.onload = function () {
      drawBoard(_canvasObj);
      drawSnakesAndLadders(_canvasObj);
      player1.drawPlayer();
      player2.drawPlayer();
      drawPlayerDetails();
    }





  }, [count])

  const handleCount=()=>{
    count = count+1;
  }
  return (
    <div className='canv'>
    
          <canvas id="canvas"></canvas>
          <DiceRoll/>

          <button onClick={handleCount}></button>


    </div>
  )
}

export default Snake