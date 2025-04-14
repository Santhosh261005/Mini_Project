import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLoginUser } from "../api/adminApi"; // Import the API function
import { Shield } from 'lucide-react';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await adminLoginUser(formData);
      alert(response.msg); // Success message from backend
      localStorage.setItem("token", response.token); // Store token
      navigate("/admin-options");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="relative z-10 w-full max-w-md px-4 sm:px-0">
        <div className="overflow-hidden shadow-xl border-0 bg-white/80 backdrop-blur-sm rounded-lg">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
            <div className="flex items-center justify-center py-3">
              <Shield className="h-8 w-8 text-white mr-2" />
              <h1 className="text-2xl font-bold text-white">Admin Login</h1>
            </div>
          </div>

          <div className="p-8">
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">Admin Login</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full p-3 border rounded-md bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full p-3 border rounded-md bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 h-12 rounded-md shadow-md hover:shadow-lg group text-white p-2"
              >
                <Shield className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
                <span>Login</span>
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6"></p>
      </div>
    </div>
  );
};

export default AdminLogin;
