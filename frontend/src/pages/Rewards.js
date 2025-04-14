import React from "react";
import { Gift, Star, Award } from "lucide-react";

const Rewards = () => {
  const rewards = [
    {
      name: "Bronze Donor",
      points: 100,
      icon: <Star className="h-8 w-8 text-amber-600" />,
      description: "Earned by donating 5+ items",
    },
    {
      name: "Silver Donor",
      points: 250,
      icon: <Star className="h-8 w-8 text-gray-400" />,
      description: "Earned by donating 15+ items",
    },
    {
      name: "Gold Donor",
      points: 500,
      icon: <Star className="h-8 w-8 text-yellow-500" />,
      description: "Earned by donating 30+ items",
    },
    {
      name: "Platinum Donor",
      points: 1000,
      icon: <Award className="h-8 w-8 text-blue-500" />,
      description: "Earned by donating 50+ items",
    },
  ];

  return (
    <div className="min-h-screen bg-white p-8 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-lg w-full">
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-4">
          <h1 className="text-2xl font-bold text-white text-center">Your Rewards</h1>
        </div>
        <div className="p-6">
          <p className="text-gray-600 text-center mb-6">
            Track your donation progress and unlock special rewards!
          </p>

          <div className="space-y-6">
            {rewards.map((reward, index) => (
              <div
                key={index}
                className="flex items-center p-4 border rounded-lg"
              >
                <div className="mr-4">{reward.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-800">{reward.name}</h3>
                  <p className="text-sm text-gray-600">{reward.description}</p>
                  <p className="text-sm font-medium text-emerald-600 mt-1">
                    {reward.points} points
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Gift className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="font-semibold text-blue-800">
                Next Reward: Diamond Donor (2000 points)
              </h3>
            </div>
            <p className="text-sm text-blue-600 mt-2">
              Donate 100+ items to unlock this exclusive reward!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
