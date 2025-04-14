import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { LogOut } from 'lucide-react';

const Navbar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/');
  };
  return (
    <nav className="fixed top-0 left-0 right-0 flex justify-between items-center py-4 px-6 bg-black/50 backdrop-blur-sm z-50">
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <img
          src={logo}
          alt="Campus Connect Logo"
          className="w-10 h-10"
          onError={() => console.log("Failed to load logo image")}
        />
        <div className="text-2xl font-bold text-white drop-shadow-md">
          <span className="text-blue-400">Campus</span> Connect
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6">
        <ul className="flex space-x-6 text-lg font-medium">
          <li>
            <Link to="/home" className="text-white hover:text-orange-500 drop-shadow-md transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="text-white hover:text-orange-500 drop-shadow-md transition-colors">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/donate" className="text-white hover:text-orange-500 drop-shadow-md transition-colors">
              Donate Now
            </Link>
          </li>
          <li>
            <Link to="/chatbot" className="text-white hover:text-orange-500 drop-shadow-md transition-colors">
              Chatbot
            </Link>
          </li>
          <li>
            <Link to="/rewards" className="text-white hover:text-orange-500 drop-shadow-md transition-colors">
              Rewards
            </Link>
          </li>
          <li>
            <Link to="/ngos" className="text-white hover:text-orange-500 drop-shadow-md transition-colors">
              NGOs
            </Link>
          </li>
        </ul>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-1 bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 drop-shadow-md transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
