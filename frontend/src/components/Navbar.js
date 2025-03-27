import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-black/50">
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        {/* Logo Image */}
        <img
          src={logo}
          alt="Campus Connect Logo"
          className="w-10 h-10"
          onError={() => console.log("Failed to load logo image")}
        />
        {/* Text */}
        <div className="text-2xl font-bold text-white drop-shadow-md">
          <span className="text-blue-400">Campus</span> Connect
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6">
        <ul className="flex space-x-6 text-lg font-medium">
          <li>
            <Link to="/" className="text-white hover:text-orange-500 drop-shadow-md">
              Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="text-white hover:text-orange-500 drop-shadow-md">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/donate" className="text-white hover:text-orange-500 drop-shadow-md">
              Donate Now
            </Link>
          </li>
          <li>
            <Link to="/chatbot" className="text-white hover:text-orange-500 drop-shadow-md">
              Chatbot
            </Link>
          </li>
          <li>
            <Link to="/rewards" className="text-white hover:text-orange-500 drop-shadow-md">
              Rewards
            </Link>
          </li>
          <li>
            <Link to="/login" className="text-white hover:text-green-400 drop-shadow-md">
              Login
            </Link>
          </li>
          <li>
            <Link to="/signup" className="text-white hover:text-green-400 drop-shadow-md">
              Signup
            </Link>
          </li>
        </ul>

        {/* Book Now Button */}
        <button className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 drop-shadow-md">
          Book Now
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
