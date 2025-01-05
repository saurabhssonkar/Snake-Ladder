import React from "react";
import { Link } from "react-router-dom";

const GameOptions = () => {
  const options = [
    { label: "Online", color: "bg-green-500", route: "/match" },
    { label: "Play with Friends", color: "bg-pink-500", route: "/friends" },
    { label: "VS Computer", color: "bg-yellow-500", route: "/computer" },
    { label: "Local", color: "bg-blue-500", route: "/local" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {options.map((option, index) => (
        <Link
          to={option.route} // Use dynamic route here
          key={index}
          className={`${option.color} flex items-center justify-center h-40 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl`}
          style={{
            boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)", // Extra shadow for 3D effect
          }}
        >
          <span className="text-2xl font-bold text-white drop-shadow-lg">
            {option.label}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default GameOptions;
