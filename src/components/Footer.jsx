import React from "react";
import { FaHome, FaChartBar, FaDiceD20, FaShoppingCart } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="flex justify-around p-4 bg-blue-800">
      <FaHome className="w-8 h-8 text-white" />
      <FaChartBar className="w-8 h-8 text-white" />
      <FaDiceD20 className="w-8 h-8 text-white" />
      <FaShoppingCart className="w-8 h-8 text-white" />
    </div>
  );
};

export default Footer;
