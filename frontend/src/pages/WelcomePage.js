// src/pages/WelcomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Welcome to Campus Connect</h2>
        <div className="flex flex-col space-y-4">
          <Link to="/login" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
            Student Login
          </Link>
          <Link to="/signup" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition">
            Student Signup
          </Link>
          <Link to="/admin-login" className="w-full bg-yellow-500 text-black p-2 rounded hover:bg-yellow-600 transition">
            Admin Login
          </Link>
          <Link to="/admin-signup" className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition">
            Admin Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;