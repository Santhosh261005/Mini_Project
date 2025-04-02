// src/pages/AdminDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Admin Dashboard</h2>
        <p>Welcome to the admin dashboard!</p>

        <div className="flex flex-col space-y-4 mt-6">
          <Link
            to="/post-requirements"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Post Requirements Now
          </Link>
          <Link
            to="/about-orphanage"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
          >
            About the Orphanage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;