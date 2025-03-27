import React from "react";
import bgImage from "../assets/background.png"; // Import the background image

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
      {/* Title */}
      <h1 className="text-8xl font-extrabold text-orange-600">
        Let's Spread Happiness
      </h1>

      {/* Description */}
      <p className="text-white mt-4 text-4xl font-medium">
        We Deliver your Donations to the Right Place
      </p>
    </div>
  );
};

export default Home;
