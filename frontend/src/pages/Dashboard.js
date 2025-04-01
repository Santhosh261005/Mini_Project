import React, { useEffect, useState } from "react";
import axios from "axios"; // Correct import


const Dashboard = () => {
  const [stats, setStats] = useState({
    booksDonated: 0,
    clothesDonated: 0,
    pointsEarned: 0,
    recentDonations: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
        const response = await axios.get("/user/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-purple-300 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          Welcome to Your Dashboard
        </h1>
        <p className="text-gray-600 text-center mt-2">
          Track your contributions and see the impact you're making!
        </p>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-green-200 p-4 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-green-700">{stats.booksDonated}</h2>
            <p className="text-gray-700">Books Donated</p>
          </div>
          <div className="bg-yellow-200 p-4 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-yellow-700">{stats.clothesDonated}</h2>
            <p className="text-gray-700">Clothes Donated</p>
          </div>
          <div className="bg-blue-200 p-4 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-blue-700">{stats.pointsEarned}</h2>
            <p className="text-gray-700">Points Earned</p>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800">Recent Donations</h2>
          <ul className="mt-4 space-y-3">
            {stats.recentDonations.length > 0 ? (
              stats.recentDonations.map((donation, index) => (
                <li key={index} className="bg-gray-100 p-3 rounded-lg">
                  📦 You donated {donation.quantity} {donation.category} to {donation.recipient}
                </li>
              ))
            ) : (
              <li className="bg-gray-100 p-3 rounded-lg text-center">No recent donations yet.</li>
            )}
          </ul>
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700">
            Donate More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
