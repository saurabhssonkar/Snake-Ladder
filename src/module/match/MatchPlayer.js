import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useNavigate, useParams } from 'react-router-dom';

const userId = "some-user-id";
const socket = io('http://localhost:4000', {
    query: { userId }
});

function MatchPlayer() {
    const [sessionUrl, setSessionUrl] = useState(null);
    const [sessionId, setSessionId] = useState(null);
    const [players, setPlayers] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    //const {mode} =  useParams()


    useEffect(() => {
        const handleMatchFound = (data) => {
            setSessionUrl(data.url);
            setSessionId(data.sessionId);
            setPlayers(data.players);
        };

        const handlePlayerOffline = ( playerId) => {
            setMessage(`Player ${playerId} has disconnected.`);
        };

        const handlePlayerQuit = (playerId ) => {
            setMessage(`Player ${playerId} has quit the game.`);
        };

        const handleSessionClosed = ( reason ) => {
            setMessage(`Session closed: ${reason}`);
        };

        const handleQuitDenied = ( reason ) => {
            setMessage(reason);
        };

        socket.on('match_found', handleMatchFound);
        socket.on('player_offline', handlePlayerOffline);
        socket.on('player_quit', handlePlayerQuit);
        socket.on('session_closed', handleSessionClosed);
        socket.on('quit_denied', handleQuitDenied);

        // return () => {
        //     socket.off('match_found', handleMatchFound);
        //     socket.off('player_offline', handlePlayerOffline);
        //     socket.off('player_quit', handlePlayerQuit);
        //     socket.off('session_closed', handleSessionClosed);
        //     socket.off('quit_denied', handleQuitDenied);
        // };
    }, [sessionUrl]);

    const quitGame = () => {
        if (sessionId) {
            socket.emit('quit_game', { sessionId });
            setSessionUrl(null);
            navigate('/')
            
        }
    };

    const handleStartGame = () => {
        if (sessionUrl) navigate('/snake-ladder');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-blue-900 text-white">
            <h1 className="text-3xl font-bold mb-4">LUDO ONLINE</h1>
            {sessionUrl ? (
                <div className="bg-yellow-500 rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-bold mb-4 text-center">Match Found!</h2>
                    <div className="flex items-center justify-center mb-4">
                        <div className="flex flex-col items-center mx-4">
                            <img src={players[0]?.avatar || 'default-avatar.png'} alt="Player 1" className="w-16 h-16 rounded-full mb-2" />
                            <p>{players[0]?.name || 'Player 1'}</p>
                        </div>
                        <span className="text-3xl font-bold mx-4">VS</span>
                        <div className="flex flex-col items-center mx-4">
                            <img src={players[1]?.avatar || 'default-avatar.png'} alt="Player 2" className="w-16 h-16 rounded-full mb-2" />
                            <p>{players[1]?.name || 'Player 2'}</p>
                        </div>
                    </div>
                    <button onClick={handleStartGame} className="bg-green-500 px-4 py-2 rounded-full text-white font-bold">
                        Start Game
                    </button>
                    <button onClick={quitGame} className="bg-red-500 px-4 py-2 rounded-full text-white font-bold mt-4">
                        Quit Game
                    </button>
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    <h2 className="text-xl font-bold mb-4">Searching for Players...</h2>
                    <div className="loader mb-4"></div>
                </div>
            )}
            {message && <p className="mt-4 text-red-500">{message}</p>}
        </div>
    );
}

export default MatchPlayer;
