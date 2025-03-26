import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-100 to-blue-300 text-center px-6">
      <h1 className="text-5xl font-extrabold text-blue-800 drop-shadow-lg">Welcome to Student Donation</h1>
      <p className="text-lg text-gray-700 mt-4 max-w-lg">
        Donate books and clothes to those in need and make a difference in someone's life.
      </p>
      <Link to="/donate">
        <button className="mt-6 px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105">
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default Home;

