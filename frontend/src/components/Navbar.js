import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-700">
        <Link to="/">RS Donations</Link>
      </h1>
      <div className="space-x-6">
        <Link to="/" className="text-gray-700 hover:text-blue-500">Home</Link>
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-500">Dashboard</Link>
        <Link to="/donate-now" className="text-gray-700 hover:text-blue-500">Donate Now</Link>
        <Link to="/chatbot" className="text-gray-700 hover:text-blue-500">Chatbot</Link>
        <Link to="/rewards" className="text-gray-700 hover:text-blue-500">Rewards</Link>
      </div>
    </nav>
  );
};

export default Navbar;
