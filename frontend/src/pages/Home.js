import React from "react";

const Home = () => {
  return (
    <div 
      className="relative min-h-screen flex items-center justify-center text-center"
      style={{ 
        background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)", // Pleasant gradient
      }}
    >
      <div className="relative z-10 p-10 bg-white bg-opacity-80 rounded-lg shadow-xl max-w-2xl">
        <h1 className="text-5xl font-extrabold text-blue-800">
          <span className="text-purple-600">Make a </span> 
          Difference <span className="text-green-500">Today!</span>
        </h1>
        <p className="text-gray-700 mt-4 text-lg">
          Donate books and clothes to those in need and spread kindness.
        </p>
      </div>
    </div>
  );
};

export default Home;
