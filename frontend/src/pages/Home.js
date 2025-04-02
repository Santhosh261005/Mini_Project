// src/pages/Home.js
import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import bgImage from "../assets/background.png";

const Home = () => {
  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center text-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        <div className="text-white font-bold text-3xl">Campus Connect</div>
        <div className="flex space-x-8">
          <Link to="/dashboard" className="text-white hover:text-gray-300 text-xl font-semibold">
            Dashboard
          </Link>
          <Link to="/donate" className="text-white hover:text-gray-300 text-xl font-semibold">
            Donate Now
          </Link>
          <Link to="/chatbot" className="text-white hover:text-gray-300 text-xl font-semibold">
            Chatbot
          </Link>
          <Link to="/rewards" className="text-white hover:text-gray-300 text-xl font-semibold">
            Rewards
          </Link>
        </div>
      </div>
      <h1 className="text-8xl font-extrabold text-orange-600">
        Let's Spread Happiness
      </h1>
      <p className="text-white mt-4 text-4xl font-medium">
        We Deliver your Donations to the Right Place
      </p>
      <Link
        to="/donate"
        className="mt-8 bg-orange-500 text-white px-8 py-4 rounded-full hover:bg-orange-600 transition text-xl"
      >
        Book a Pickup
      </Link>
    </div>
  );
};

export default Home;