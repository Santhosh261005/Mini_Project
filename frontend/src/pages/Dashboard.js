import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    booksDonated: 42,         // Default public data
    clothesDonated: 36,       // Default public data
    pointsEarned: 0,          // Will update if logged in
    recentDonations: [
      { quantity: 5, category: "books", recipient: "Local School" },
      { quantity: 3, category: "clothes", recipient: "Community Shelter" }
    ]
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isLoggedIn = !!token;
    setIsAuthenticated(isLoggedIn);

    const fetchData = async () => {
      try {
        if (isLoggedIn) {
          const response = await axios.get("/user/stats", {
            headers: { Authorization: `Bearer ${token}` }
          });
          setStats(prev => ({
            ...prev,
            booksDonated: response.data.booksDonated,
            clothesDonated: response.data.clothesDonated,
            pointsEarned: response.data.pointsEarned,
            recentDonations: response.data.recentDonations || prev.recentDonations
          }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-cyan-600 to-teal-600 p-4">
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
            {isAuthenticated && (
              <div className="bg-blue-200 p-4 rounded-lg text-center">
                <h2 className="text-2xl font-bold text-blue-700">{stats.pointsEarned}</h2>
                <p className="text-gray-700">Points Earned</p>
              </div>
            )}
          </div>

          {/* Recent Activity Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800">
              {isAuthenticated ? "Your Recent Donations" : "Recent Community Donations"}
            </h2>
            <ul className="mt-4 space-y-3">
              {stats.recentDonations.map((donation, index) => (
                <li key={index} className="bg-gray-100 p-3 rounded-lg">
                  📦 {isAuthenticated ? "You" : "Someone"} donated {donation.quantity} {donation.category} to {donation.recipient}
                </li>
              ))}
            </ul>
          </div>

          {/* Call to Action */}
          <div className="mt-8 text-center">
            <Link
              to="/donate"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
            >
              {isAuthenticated ? "Donate More" : "Join and Donate"}
            </Link>
            {!isAuthenticated && (
              <p className="mt-4 text-sm text-gray-600">
                <Link to="/login" className="text-blue-600 hover:underline">
                  Sign in
                </Link> to track your personal contributions
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
