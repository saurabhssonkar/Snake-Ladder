import React, { useState, useEffect } from 'react';
import { Users, Loader2, Dices, X, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// type MatchmakingStatus = 'idle' | 'searching' | 'matched';

// interface Player {
//   id: string;
//   name: string;
//   avatar: string;
//   rank?: string;
// }

function PlayerMatch() {
  const [status, setStatus] = useState('idle');
  const [searchTime, setSearchTime] = useState(0);
  const [matchedPlayer, setMatchedPlayer] = useState(null);
  const navigation = useNavigate();

  useEffect(() => {
    let interval
    
    if (status === 'searching') {
      interval = setInterval(() => {
        setSearchTime(prev => prev + 1);
        
        if (searchTime > 1 && Math.random() > 0.7) {
          setMatchedPlayer({
            id: '123',
            name: 'Alex Thompson',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop',
            rank: 'Gold'
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
  const handlButton = ()=>{
    navigation('/snake-ladder')

  }

  return (
    <div className="min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-700 via-purple-700 to-pink-700 flex items-center justify-center p-4">
      <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20">
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-1 rounded-xl shadow-lg">
            <div className="bg-white px-4 py-2 rounded-lg">
              <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-bold">
                LUDO MASTERS
              </h1>
            </div>
          </div>
        </div>

        {status === 'idle' && (
          <div className="text-center mt-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Play?</h2>
            <div className="mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transform hover:scale-105 transition-transform duration-300 shadow-xl">
                <div className="bg-white p-6 rounded-xl">
                  <Users className="w-14 h-14 text-purple-600" />
                </div>
              </div>
              <p className="text-gray-600 text-lg">Find your next worthy opponent!</p>
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>1,234 Players Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={startMatchmaking}
              className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
            >
              Start Matchmaking
            </button>
          </div>
        )}

        {status === 'searching' && (
          <div className="text-center mt-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Finding Opponent...</h2>
            <div className="mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 relative">
                <div className="absolute inset-0 rounded-2xl border-4 border-white border-t-transparent animate-spin"></div>
                <div className="bg-white p-6 rounded-xl">
                  <Loader2 className="w-14 h-14 text-purple-600 animate-pulse" />
                </div>
              </div>
              <p className="text-gray-600 text-lg animate-pulse">Searching the universe...</p>
              <p className="text-sm text-gray-500 mt-3">Time elapsed: {searchTime}s</p>
              <div className="mt-4 space-y-2">
                <div className="h-2 bg-purple-200 rounded-full w-3/4 mx-auto animate-pulse"></div>
                <div className="h-2 bg-pink-200 rounded-full w-1/2 mx-auto animate-pulse"></div>
              </div>
            </div>
            <button
              onClick={cancelMatchmaking}
              className="w-full py-4 px-6 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 shadow-md"
            >
              Cancel Search
            </button>
          </div>
        )}

        {status === 'matched' && matchedPlayer && (
          <div className="text-center mt-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Perfect Match!</h2>
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-10 mb-8">
                <div className="text-center space-y-3">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-purple-200 transform hover:scale-105 transition-transform duration-300 shadow-lg">
                      <img
                        src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop"
                        alt="You"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-1">
                      <div className="bg-white p-1 rounded">
                        <Crown className="w-4 h-4 text-yellow-500" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">You</p>
                    <p className="text-sm text-purple-600 font-medium">Diamond</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl transform -rotate-12">
                    <div className="bg-white p-3 rounded-xl transform rotate-12">
                      <Dices className="w-8 h-8 text-purple-600" />
                    </div>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-500 px-2 py-1 rounded-full">
                    <p className="text-xs text-white font-medium">VS</p>
                  </div>
                </div>

                <div className="text-center space-y-3">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-purple-200 transform hover:scale-105 transition-transform duration-300 shadow-lg">
                      <img
                        src={matchedPlayer.avatar}
                        alt={matchedPlayer.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-1">
                      <div className="bg-white p-1 rounded">
                        <Crown className="w-4 h-4 text-yellow-500" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{matchedPlayer.name}</p>
                    <p className="text-sm text-purple-600 font-medium">{matchedPlayer.rank}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3 -mb-8">
                <p className="text-green-600 font-semibold text-lg">Match Ready!</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full animate-[loading_2s_ease-in-out]"></div>
                </div>
                <p className="text-sm text-gray-500">Game starting in 3 seconds...</p>
                <button onClick={handlButton} className='px-20 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold text-xl '>Play match</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlayerMatch;





