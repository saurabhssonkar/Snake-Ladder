
import React, { useState } from 'react';
import { Gamepad2, Users, Trophy, Dice5, Rocket, Globe2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigation = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const handleButton = () => {
    navigation("/ludo-match")

  }
  return (
    <div className=" min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 text-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16">

        <nav className='flex justify-between items-center mb-16'>
          {/* logo */}
          <div className='flex items-center gap-2'>
            <Dice5 size={32} className='text-yellow-400 animate-spin-slow' />
            <span className='text-2xl font-bold'>
              LudoSanke
            </span>
          </div>
          {/* DesktopMenu  */}
          <div className='hidden md:flex gap-6'>
            <button className='hover:text-yellow-400 transition-colors'>How to Play</button>
            <button className='hover:text-yellow-400 transition-colors'>Leaderboard</button>
            <button className='bg-yellow-400 text-purple-900 px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition-colors'>Play Now</button>
          </div>


          {/* mobile menu Toggle Icon  */}
          <div className='md:hidden'>
            <button onClick={() => setMenuOpen
              (!menuOpen)} className="text-yellow-400 focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>

            </button>
          </div>
          {/* Mobile Menu  */}
          {menuOpen && (
            <div className={`absolute top-16 left-0 w-full bg-purple-900 shadow-lg md:hidden transition-all duration-1000 ease-in-out ${
              menuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-5 pointer-events-none"
            }`}>
              <div className='flex justify-between items-center gap-4 py-6 px-4'>
                <div className='flex  items-center gap-2'>
                  <Dice5 size={32} className='text-yellow-400 animate-spin-slow' />
                  <span className='text-2xl font-bold'>
                    LudoSanke
                  </span>
                </div>
                <div className='flex gap-8'>
                  <button className='hover:text-yellow-400 transition-colors'>How to Play</button>
                  <button className='hover:text-yellow-400 transition-colors'>Leaderboard</button>
                  <button className='bg-yellow-400 text-purple-900 px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition-colors'>Play Now</button>
                </div>


              </div>

            </div>
          )}


        </nav>

        <div className=" mt-32 md:mt-1 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl  md:text-6xl font-bold mb-6">
              Experience the Classic
              <span className="text-yellow-400"> Fusion Game</span>
            </h1>
            <p className="md:text-xl  text-lg mb-8 text-purple-200">
              Combine the strategy of Ludo with the thrill of Snake & Ladders in this
              unique multiplayer experience. Play with friends or challenge players worldwide!
            </p>
            <div className="flex  gap-4">
              <button onClick={handleButton} className="bg-yellow-400 text-purple-900 px-8 py-1 md:px-8 md:py-4  rounded-full font-semibold text-base md:text-lg hover:bg-yellow-300 transition-colors flex items-center gap-2">
                <Gamepad2 size={24} />
                Play Online
              </button>
              <button className="border-2 border-yellow-400 text-yellow-400 md:px-8 md:py- px-3 py-2 rounded-full font-semiboldtext-base md:text-lg hover:bg-yellow-400 hover:text-purple-900 transition-colors flex items-center gap-2">
                <Users size={24} />
                Multiplayer
              </button>
            </div>
          </div>
          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&w=600&h=600"
              alt="Game Preview"
              className="rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300"
            />
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto  px-3 py-3 md:px-4 md:py-20">
        <h2 className="text-4xl font-bold text-center mb-16">Why Choose LudoSnake?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 ">
          <FeatureCard
            icon={<Globe2 size={40} className="text-yellow-400" />}
            title="Global Matchmaking"
            description="Play with players from around the world in real-time matches"
          />
          <FeatureCard
            icon={<Users size={40} className="text-yellow-400" />}
            title="Private Rooms"
            description="Create private game rooms to play with friends and family"
          />
          <FeatureCard
            icon={<Trophy size={40} className="text-yellow-400" />}
            title="Tournaments"
            description="Compete in daily tournaments and climb the global leaderboard"
          />
          <FeatureCard
            icon={<Rocket size={40} className="text-yellow-400" />}
            title="Power-Ups"
            description="Unique power-ups that combine Ludo and Snake mechanics"
          />
          <FeatureCard
            icon={<Dice5 size={40} className="text-yellow-400" />}
            title="Custom Rules"
            description="Customize game rules and create your perfect match"
          />
          <FeatureCard
            icon={<Gamepad2 size={40} className="text-yellow-400" />}
            title="Cross-Platform"
            description="Play seamlessly across all your devices"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-28 md:py-20 md:-mt-20 ">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold text-purple-900 mb-6">
            Ready to Start Playing?
          </h2>
          <p className="text-xl text-purple-900 mb-8 max-w-2xl mx-auto">
            Join millions of players worldwide and experience the most exciting
            fusion of classic board games ever created!
          </p>
          <button className="bg-purple-900 text-yellow-400 px-8 py-4 rounded-full font-semibold text-lg hover:bg-purple-800 transition-colors">
            Play Now - It's Free!
          </button>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/15 transition-colors">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-purple-200">{description}</p>
    </div>
  );
}

export default Landing;