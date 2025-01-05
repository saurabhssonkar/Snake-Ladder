import React from "react";

const Header = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-blue-700">
      <div className="flex items-center">
        <img
          src="/assets/profile.png"
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <span className="ml-2 font-bold">Your Name</span>
      </div>
      <div className="flex items-center">
        <div className="mx-2 text-yellow-400">Level: 84</div>
        <div className="mx-2">Coins: 309,765</div>
        <div className="mx-2 text-pink-400">Gems: 8,124</div>
      </div>
    </div>
  );
};

export default Header;
