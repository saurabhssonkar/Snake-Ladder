import React from "react";
import { FaCog, FaUsers, FaGift } from "react-icons/fa";

const Menu = () => {
  return (
    <div className="flex justify-around p-4 bg-blue-800">
      <FaCog className="w-10 h-10 text-white" />
      <FaUsers className="w-10 h-10 text-white" />
      <FaGift className="w-10 h-10 text-white" />
    </div>
  );
};

export default Menu;
