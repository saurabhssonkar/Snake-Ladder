<!-- import React, { useState, useEffect } from 'react';
import { Users, Loader2, Dices, X } from 'lucide-react';

type MatchmakingStatus = 'idle' | 'searching' | 'matched';

interface Player {
  id: string;
  name: string;
  avatar: string;
}

function App() {
  const [status, setStatus] = useState<MatchmakingStatus>('idle');
  const [searchTime, setSearchTime] = useState(0);
  const [matchedPlayer, setMatchedPlayer] = useState<Player | null>(null);

  // Simulate matchmaking process
  useEffect(() => {
    let interval: number;
    
    if (status === 'searching') {
      interval = setInterval(() => {
        setSearchTime(prev => prev + 1);
        
        // Simulate finding a match after 5-10 seconds
        if (searchTime > 5 && Math.random() > 0.7) {
          setMatchedPlayer({
            id: '123',
            name: 'Alex Thompson',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop'
          });
          setStatus('matched');
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [status, searchTime]);

  const startMatchmaking = () => {
    setStatus('searching');
    setSearchTime(0);
    setMatchedPlayer(null);
  };

  const cancelMatchmaking = () => {
    setStatus('idle');
    setSearchTime(0);
    setMatchedPlayer(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {status === 'idle' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Ready to Play Ludo?</h2>
            <div className="mb-8">
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-12 h-12 text-purple-600" />
              </div>
              <p className="text-gray-600">Find an opponent and start playing!</p>
            </div>
            <button
              onClick={startMatchmaking}
              className="w-full py-3 px-6 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Find Match
            </button>
          </div>
        )}

        {status === 'searching' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Finding Opponent...</h2>
            <div className="mb-8">
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                <div className="absolute inset-0 rounded-full border-4 border-purple-400 border-t-transparent animate-spin"></div>
                <Loader2 className="w-12 h-12 text-purple-600 animate-pulse" />
              </div>
              <p className="text-gray-600">Searching for players...</p>
              <p className="text-sm text-gray-500 mt-2">Time elapsed: {searchTime}s</p>
            </div>
            <button
              onClick={cancelMatchmaking}
              className="w-full py-3 px-6 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}

        {status === 'matched' && matchedPlayer && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Opponent Found!</h2>
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-8 mb-6">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-purple-200 mb-2">
                    <img
                      src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop"
                      alt="You"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm font-medium">You</p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full">
                  <Dices className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-purple-200 mb-2">
                    <img
                      src={matchedPlayer.avatar}
                      alt={matchedPlayer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm font-medium">{matchedPlayer.name}</p>
                </div>
              </div>
              <p className="text-green-600 font-medium mb-2">Match Ready!</p>
              <p className="text-sm text-gray-500">Game starting in 3 seconds...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

 -->
