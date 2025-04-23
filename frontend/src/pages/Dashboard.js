import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState({
    booksDonated: 5,
    clothesDonated: 3,
    pointsEarned: 8,
    recentDonations: [
      { quantity: 5, category: "books", recipient: "Mother Teresa Orphanage" },
      { quantity: 3, category: "clothes", recipient: "Sairam Charity" }
    ]
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedIn = !!token;
    setIsAuthenticated(loggedIn);

    if (loggedIn) {
      axios
        .get("/user/stats", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
          setStats((prev) => ({
            ...prev,
            booksDonated: response.data.booksDonated,
            clothesDonated: response.data.clothesDonated,
            pointsEarned: response.data.pointsEarned,
            recentDonations: response.data.recentDonations || prev.recentDonations
          }));
        })
        .catch((error) => {
          console.error("Error fetching user stats:", error);
        });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-200 to-pink-300 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl overflow-hidden">
        {/* Vibrant gradient heading */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-4">
          <h1 className="text-2xl font-bold text-white text-center">
            {isAuthenticated ? "Your Dashboard" : "Community Dashboard"}
          </h1>
        </div>

        <div className="p-6">
          <p className="text-gray-600 text-center">
            {isAuthenticated
              ? "Track your contributions and see the impact you're making!"
              : "See how our community is making a difference!"}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-green-200 p-4 rounded-lg text-center shadow-md">
              <h2 className="text-2xl font-bold text-green-700">{stats.booksDonated}</h2>
              <p className="text-gray-700">Books Donated</p>
            </div>
            <div className="bg-yellow-200 p-4 rounded-lg text-center shadow-md">
              <h2 className="text-2xl font-bold text-yellow-700">{stats.clothesDonated}</h2>
              <p className="text-gray-700">Clothes Donated</p>
            </div>
            {isAuthenticated && (
              <div className="bg-blue-200 p-4 rounded-lg text-center shadow-md">
                <h2 className="text-2xl font-bold text-blue-700">{stats.pointsEarned}</h2>
                <p className="text-gray-700">Points Earned</p>
              </div>
            )}
          </div>

          {/* Recent Donations */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800">
              {isAuthenticated ? "Your Recent Donations" : "Recent Community Donations"}
            </h2>
            <ul className="mt-4 space-y-3">
              {stats.recentDonations.length > 0 ? (
                stats.recentDonations.map((donation, index) => (
                  <li key={index} className="bg-gray-100 p-3 rounded-lg shadow-sm">
                    📦 {isAuthenticated ? "You" : "Someone"} donated {donation.quantity}{" "}
                    {donation.category} to {donation.recipient}
                  </li>
                ))
              ) : (
                <li className="bg-gray-100 p-3 rounded-lg text-center">
                  No recent donations yet.
                </li>
              )}
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <Link
              to="/donate"
              className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg shadow-lg hover:from-purple-700 hover:to-pink-700 transition-colors"
            >
              {isAuthenticated ? "Donate More" : "Join and Donate"}
            </Link>
            {!isAuthenticated && (
              <p className="mt-4 text-sm text-gray-600">
                <Link to="/login" className="text-purple-600 hover:underline">
                  Sign in
                </Link>{" "}
                to track your personal contributions
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
