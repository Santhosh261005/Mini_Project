import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { Users, MapPin, Calendar, Mail, Lock, ArrowRight } from 'lucide-react';
=======
import { adminSignupUser } from "../api/adminApi"; // Import the API function
>>>>>>> caa5d750404b1af18d194a4f28b919253457a53f

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
<<<<<<< HEAD
    setError('');

    // Temporary logic for demonstration
    alert('Admin signup successful!');
    navigate('/admin-login');
=======
    setError("");
  
    try {
      const response = await adminSignupUser(formData);
      alert(response.msg); // Success message from backend
      navigate("/admin-login");
    } catch (err) {
      setError(err.message);
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

<<<<<<< HEAD
      <div className="relative z-10 w-full max-w-md px-4 sm:px-0">
        <div className="overflow-hidden shadow-xl border-0 bg-white/80 backdrop-blur-sm rounded-lg">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-700 to-blue-700 p-4">
            <div className="flex items-center justify-center py-3">
              <Users className="h-8 w-8 text-white mr-2" />
              <h1 className="text-2xl font-bold text-white">Admin Signup</h1>
            </div>
          </div>
          
          <div className="p-8">
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">NGO Registration</h2>
            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Owner Name</label>
                <input
                  type="text"
                  name="ownerName"
                  placeholder="Full name"
                  value={formData.ownerName}
                  className="w-full p-3 border rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">NGO Location</label>
                <div className="relative">
                  <input
                    type="text"
                    name="ngoLocation"
                    placeholder="City, State"
                    value={formData.ngoLocation}
                    className="w-full p-3 border rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    onChange={handleChange}
                    required
                  />
                  <MapPin className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Children Count</label>
                <input
                  type="number"
                  name="childrenCount"
                  placeholder="0"
                  value={formData.childrenCount}
                  className="w-full p-3 border rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Middle Age Count</label>
                <input
                  type="number"
                  name="middleAgeCount"
                  placeholder="0"
                  value={formData.middleAgeCount}
                  className="w-full p-3 border rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Elderly Count (>60)</label>
                <input
                  type="number"
                  name="olderCount"
                  placeholder="0"
                  value={formData.olderCount}
                  className="w-full p-3 border rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year of Establishment</label>
                <div className="relative">
                  <input
                    type="text"
                    name="establishmentYear"
                    placeholder="YYYY"
                    value={formData.establishmentYear}
                    className="w-full p-3 border rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    onChange={handleChange}
                    required
                  />
                  <Calendar className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Owner Email</label>
                <div className="relative">
                  <input
                    type="email"
                    name="ownerEmail"
                    placeholder="email@example.com"
                    value={formData.ownerEmail}
                    className="w-full p-3 border rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    onChange={handleChange}
                    required
                  />
                  <Mail className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
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
                  <Lock className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <button
                type="submit"
                className="flex items-center justify-center w-full bg-gradient-to-r from-slate-600 to-blue-600 hover:from-slate-700 hover:to-blue-700 transition-all duration-300 h-12 rounded-md shadow-md hover:shadow-lg group text-white p-2"
              >
                <span>Register NGO</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <a href="/admin-login" className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200">
                Already registered? Sign in
              </a>
            </div>
          </div>
        </div>
        
        <p className="text-center text-gray-500 text-sm mt-6">
          © 2023 Campus Connect - Administrative System
        </p>
=======
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="ownerName"
            placeholder="Owner Name"
            className="w-full p-2 border rounded mt-2"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="ngoLocation"
            placeholder="NGO Location"
            className="w-full p-2 border rounded mt-2"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="childrenCount"
            placeholder="No. of Children"
            className="w-full p-2 border rounded mt-2"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="middleAgeCount"
            placeholder="No. of Middle Aged People"
            className="w-full p-2 border rounded mt-2"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="olderCount"
            placeholder="No. of Older (>60) People"
            className="w-full p-2 border rounded mt-2"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="establishmentYear"
            placeholder="Year of Establishment"
            className="w-full p-2 border rounded mt-2"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="ownerEmail"
            placeholder="Owner Email"
            className="w-full p-2 border rounded mt-2"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 border rounded mt-2"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
          >
            Signup
          </button>
        </form>
>>>>>>> caa5d750404b1af18d194a4f28b919253457a53f
      </div>
    </div>
  );
};

export default AdminSignup;
