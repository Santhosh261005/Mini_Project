import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminSignupUser } from "../api/adminApi";

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    ownerName: '',
    ngoLocation: '',
    childrenCount: 0,
    middleAgeCount: 0,
    olderCount: 0,
    establishmentYear: '',
    ownerEmail: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await adminSignupUser(formData);
      alert(response.msg);
      navigate("/admin-login");
    } catch (err) {
      setError(err.message || "Signup Failed. Please Try again");
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center"
      style={{
        backgroundImage: 'linear-gradient(to bottom right, #ffe4e1, #ffcccb)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-4 sm:px-0">
        <div className="overflow-hidden shadow-xl border-0 bg-white/80 backdrop-blur-sm rounded-lg">
          <div className="bg-gradient-to-r from-red-500 to-orange-600 p-4">
            <h2 className="text-2xl font-bold text-center text-white">Admin Signup</h2>
          </div>
          <div className="p-6">
            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="ownerName"
                placeholder="Owner Name"
                className="w-full p-3 border rounded-md bg-gray-50 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="ngoLocation"
                placeholder="NGO Location"
                className="w-full p-3 border rounded-md bg-gray-50 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="childrenCount"
                placeholder="No. of Children"
                className="w-full p-3 border rounded-md bg-gray-50 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="middleAgeCount"
                placeholder="No. of Middle Aged People"
                className="w-full p-3 border rounded-md bg-gray-50 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="olderCount"
                placeholder="No. of Older (>60) People"
                className="w-full p-3 border rounded-md bg-gray-50 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="establishmentYear"
                placeholder="Year of Establishment"
                className="w-full p-3 border rounded-md bg-gray-50 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="ownerEmail"
                placeholder="Owner Email"
                className="w-full p-3 border rounded-md bg-gray-50 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-3 border rounded-md bg-gray-50 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 transition-all duration-300 h-12 rounded-md shadow-md hover:shadow-lg text-white font-semibold"
              >
                Signup
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
