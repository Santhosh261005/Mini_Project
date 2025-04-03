import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { Shield, Key, ArrowRight } from 'lucide-react';
=======
import { adminLoginUser } from "../api/adminApi"; // Import the API function
>>>>>>> caa5d750404b1af18d194a4f28b919253457a53f

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    setError("");
    navigate('/admin-options');
=======
  
    try {
      const response = await adminLoginUser(formData);
      alert(response.msg); // Success message from backend
      localStorage.setItem("adminToken", response.token); // Store token
      navigate("/admin-options");
    } catch (err) {
      alert(err.message);
    }
>>>>>>> caa5d750404b1af18d194a4f28b919253457a53f
  };


  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-slate-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-4 sm:px-0">
        <div className="overflow-hidden shadow-xl border-0 bg-white/80 backdrop-blur-sm rounded-lg">
          <div className="bg-gradient-to-r from-slate-700 to-blue-700 p-4">
            <div className="flex items-center justify-center py-3">
              <Shield className="h-8 w-8 text-white mr-2" />
              <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
            </div>
          </div>
          
          <div className="p-8">
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">Administrative Access</h2>
            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="admin@example.com"
                  value={formData.email}
                  className="w-full p-3 border rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Admin Password</label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    className="w-full p-3 border rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    onChange={handleChange}
                    required
                  />
                  <Key className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <button
                type="submit"
                className="flex items-center justify-center w-full bg-gradient-to-r from-slate-600 to-blue-600 hover:from-slate-700 hover:to-blue-700 transition-all duration-300 h-12 rounded-md shadow-md hover:shadow-lg group text-white p-2"
              >
                <span>Access Admin Panel</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200">
                Contact System Administrator
              </a>
            </div>
          </div>
        </div>
        
        <p className="text-center text-gray-500 text-sm mt-6">
          © 2023 Campus Connect - Administrative System
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
