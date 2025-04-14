import React from "react";
import { useNavigate } from "react-router-dom";
import { Gift, Trophy, Award, Star } from "lucide-react";

const rewardsData = [
  { title: "Bronze Donor", points: 50, color: "from-red-400 to-orange-500", icon: <Star size={18} /> },
  { title: "Silver Donor", points: 100, color: "from-rose-400 to-pink-500", icon: <Award size={18} /> },
  { title: "Gold Donor", points: 200, color: "from-red-500 to-orange-600", icon: <Trophy size={18} /> },
  { title: "Platinum Donor", points: 500, color: "from-crimson-500 to-red-600", icon: <Gift size={18} /> },
];

const userPoints = 120;

const Rewards = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-100 to-orange-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-red-50 to-orange-50 opacity-50 -z-10"></div>
      
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md overflow-hidden transform transition-all hover:scale-[1.01] hover:shadow-3xl relative">
        {/* Gradient Header */}
        <div className="bg-gradient-to-r from-red-600 to-rose-600 p-6 text-center">
          <h1 className="text-3xl font-bold text-white drop-shadow-lg">Donation Rewards</h1>
        </div>
        
        {/* Subheading */}
        <div className="px-6 pt-4 pb-2">
          <p className="text-gray-600 text-center text-sm">
            Earn points and unlock exclusive badges
          </p>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pb-6">
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Your progress</span>
              <span>{userPoints}/500 points</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-gradient-to-r from-red-400 to-rose-500 h-2.5 rounded-full"
                style={{ width: `${(userPoints / 500) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Rewards Grid */}
          <div className="mt-6 grid grid-cols-2 gap-4 mb-6">
            {rewardsData.map((reward, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border-2 ${
                  userPoints >= reward.points
                    ? `bg-gradient-to-br ${reward.color} border-transparent text-white shadow-lg`
                    : "bg-white border-gray-200 text-gray-400"
                } flex flex-col items-center transition-all transform hover:scale-105 hover:shadow-xl`}
              >
                <div className="mb-2">
                  {React.cloneElement(reward.icon, {
                    className: userPoints >= reward.points ? "text-white" : "text-gray-300",
                    size: 24
                  })}
                </div>
                <h3 className="font-semibold text-center">{reward.title}</h3>
                <p className="text-xs mt-1">
                  {userPoints >= reward.points ? (
                    <span className="text-white">✓ Unlocked</span>
                  ) : (
                    `${reward.points} pts`
                  )}
                </p>
              </div>
            ))}
          </div>

          {/* Donate Button */}
          <button
            onClick={() => navigate("/donate-now")}
            className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white py-3 rounded-xl font-medium hover:shadow-xl transition-all hover:from-red-700 hover:to-rose-700"
          >
            Donate Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
