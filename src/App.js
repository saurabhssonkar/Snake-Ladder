// import React, { useState } from "react";
// import GameBoard from "./components/GameBoard";
// import DiceRoll from "./components/DiceRoll";
// import Dice from "./Dice";
// import Snake from "./components/snake";

// const App = () => {
//   const [players, setPlayers] = useState([
//     { id: 1, position: 1, color: "green" },
//     { id: 2, position: 1, color: "red" },
//   ]);
//   const [currentPlayer, setCurrentPlayer] = useState(0);

//   // Define snakes and ladders
//   const snakes = [
//     // { from: 56, to: 45 },
  
//     { from: 10, to: 12 }
//   ];
//   const ladders = [
//     { from: 19, to: 45 },
//     { from: 3, to: 22 },
//     { from: 78, to: 99 },
//   ];

//   const handleDiceRoll = (value) => {
//     setPlayers((prevPlayers) =>
//       prevPlayers.map((player, index) => {
//         if (index === currentPlayer) {
//           let newPosition = Math.min(player.position + value, 100);

//           // Check for snakes
//           snakes.forEach((snake) => {
//             if (newPosition === snake.from) newPosition = snake.to;
//           });

//           // Check for ladders
//           ladders.forEach((ladder) => {
//             if (newPosition === ladder.from) newPosition = ladder.to;
//           });

//           return { ...player, position: newPosition };
//         }
//         return player;
//       })
//     );
//     setCurrentPlayer((prev) => (prev + 1) % players.length);
//   };

//   return (
//     <div className="p-6 bg-gray-400 min-h-screen flex flex-col items-center">
//       <h1 className="text-3xl font-bold mb-4">Snakes and Ladders</h1>
//       {/* <GameBoard players={players} snakes={snakes} ladders={ladders} /> */}
//       {/* <DiceRoll onRoll={handleDiceRoll} /> */}
//       <Snake/>
//     </div>
//   );
// };

// export default App;


import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PlayerMatch from './matchmaking/PlayerMatch'
import Landing from "./pages/Landing"

// Lazy load components
const Snake = lazy(() => import('./snake_ladder_module/components/snake'));
const MatchPlayer = lazy(() => import('./module/match/MatchPlayer'));
// const Landing = lazy(() => import('./pages/Landing')); // Lazily loaded Landing if needed
function App() {
    return (
        <BrowserRouter>
          
                <Routes>
                    {/* Route for Landing */}
                    <Route path="/" element={<Landing/>} />
                    <Route path='ludo-match'  element = {<PlayerMatch/>} />

                    {/* Route for Snake-Ladder (Lazy Loaded) */}
                    <Route
                        path="snake-ladder"
                        element={
                            <Suspense fallback={<div>Loading Snake Game...</div>}>
                                <Snake />
                            </Suspense>
                        }
                    />
                        
                      <Route
                        path="match"
                        element={
                            <Suspense fallback={<div>Loading Match Player...</div>}>
                                <MatchPlayer key="match" />
                            </Suspense>
                        }
                    />
                    
                </Routes>
        </BrowserRouter>
    );
}

export default App;
