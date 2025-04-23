// src/pages/Home.js
import React from "react";
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
      <h1 className="text-8xl font-extrabold text-orange-600">
        Let's Spread Happiness
      </h1>
      <p className="text-white mt-4 text-4xl font-medium">
        We Deliver your Donations to the Right Place
      </p>
      {/* Removed Book a Pickup button as requested */}
    </div>
  );
};

export default Home;