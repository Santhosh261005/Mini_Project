import React from "react";
import { useNavigate } from "react-router-dom";

const rewardsData = [
  { title: "Bronze Donor", points: 50, color: "bg-yellow-500" },
  { title: "Silver Donor", points: 100, color: "bg-gray-400" },
  { title: "Gold Donor", points: 200, color: "bg-yellow-300" },
  { title: "Platinum Donor", points: 500, color: "bg-blue-500" },
];

const userPoints = 120; // Example: Adjust based on user data

const Rewards = () => {
  const navigate = useNavigate(); // React Router hook for navigation

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-300 to-blue-300 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">🎉 Your Rewards 🎉</h1>
        <p className="text-gray-600 text-center">Earn points for each donation and unlock special badges!</p>

        {/* Progress Bar */}
        <div className="mt-4 w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-500 h-4 rounded-full transition-all"
            style={{ width: `${(userPoints / 500) * 100}%` }}
          ></div>
        </div>
        <p className="text-center text-sm text-gray-700 mt-1">{userPoints} / 500 Points</p>

        {/* Rewards Badges */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          {rewardsData.map((reward, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg text-white text-center shadow-lg ${
                userPoints >= reward.points ? reward.color : "bg-gray-300"
              }`}
            >
              {reward.title}
            </div>
          ))}
        </div>

        {/* Encourage More Donations */}
        <div className="mt-6 text-center">
          <p className="text-gray-700">Donate more to unlock higher tiers and exclusive rewards!</p>
          <button
            onClick={() => navigate("/donate-now")} // Redirect to Donate Now page
            className="inline-block mt-4 bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
          >
            Donate Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
