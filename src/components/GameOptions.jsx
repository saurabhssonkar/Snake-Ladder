import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const GameOptions = () => {
  const [userProfile, setUserProfile] = useState(localStorage.getItem("user"));
  const [showPopup, setShowPopup] = useState(false);
  const [username, setUsername] = useState("");
  const [redirectPath, setRedirectPath] = useState("");
  const navigate = useNavigate();

  const options = [
    { label: "Online", color: "bg-green-500", route: "/match" },
    { label: "Play with Friends", color: "bg-pink-500", route: "/friends" },
    { label: "VS Computer", color: "bg-yellow-500", route: "/computer" },
    { label: "Local", color: "bg-blue-500", route: "/local" },
  ];

  const handleOptionClick = (route) => {
    if (!userProfile) {
      // Show popup if userProfile is null
      setRedirectPath(route);
      setShowPopup(true);
    } else {
      navigate(route);
    }
  };

  const handleSaveUsername = () => {
    if (username.trim()) {
      // Save username to localStorage
      localStorage.setItem("user", username);
      setUserProfile(username);
      setShowPopup(false);
      navigate(redirectPath);
    }
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {options.map((option, index) => (
          <div
            key={index}
            className={`${option.color} flex items-center justify-center h-40 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer`}
            style={{
              boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)", // Extra shadow for 3D effect
            }}
            onClick={() => handleOptionClick(option.route)}
          >
            <span className="text-2xl font-bold text-white drop-shadow-lg">
              {option.label}
            </span>
          </div>
        ))}
      </div>

      {/* Popup for Username */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl  text-gray-800 font-bold mb-4">Enter Your Any  Username</h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 text-black p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Plaese Enter any random username"
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveUsername}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Singup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameOptions;
