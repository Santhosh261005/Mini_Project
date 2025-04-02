import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Navbar.css";

const Navbar = ({ children }) => {
  const location = useLocation();

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
            <Link
              to="/"
              className={`text-white hover:text-orange-500 drop-shadow-md ${
                location.pathname === "/" ? "text-orange-500" : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className={`text-white hover:text-orange-500 drop-shadow-md ${
                location.pathname === "/dashboard" ? "text-orange-500" : ""
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/donate"
              className={`text-white hover:text-orange-500 drop-shadow-md ${
                location.pathname === "/donate" ? "text-orange-500" : ""
              }`}
            >
              Donate Now
            </Link>
          </li>
          <li>
            <Link
              to="/chatbot"
              className={`text-white hover:text-orange-500 drop-shadow-md ${
                location.pathname === "/chatbot" ? "text-orange-500" : ""
              }`}
            >
              Chatbot
            </Link>
          </li>
          <li>
            <Link
              to="/rewards"
              className={`text-white hover:text-orange-500 drop-shadow-md ${
                location.pathname === "/rewards" ? "text-orange-500" : ""
              }`}
            >
              Rewards
            </Link>
          </li>
        </ul>
      </div>
      {children}
    </nav>
  );
};

export default Navbar;