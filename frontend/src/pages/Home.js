// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/background.png";

const Home = () => {
  return (
    <div 
      className="relative min-h-screen flex flex-col items-center justify-center text-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="mt-16 px-4"> {/* Add margin-top to account for navbar */}
        <h1 className="text-6xl md:text-8xl font-extrabold text-orange-600 mb-4 drop-shadow-lg">
          Let's Spread Happiness
        </h1>
        <p className="text-white text-2xl md:text-4xl font-medium mb-8 drop-shadow-md">
          We Deliver your Donations to the Right Place
        </p>
        <Link
          to="/donate"
          className="inline-block bg-orange-500 text-white px-8 py-4 rounded-full hover:bg-orange-600 transition-colors text-xl font-medium shadow-lg"
        >
          Book a Pickup
        </Link>
      </div>
    </div>
  );
};

export default Home;