import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { LogIn } from 'lucide-react';
import { loginUser } from "../api/api";

const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginUser(formData);
      
      // Store token in localStorage
      localStorage.setItem('authToken', response.token);
      
      // Update authentication state
      setIsAuthenticated(true);
      
      // Redirect to home or previous location
      const from = location.state?.from?.pathname || '/home';
      navigate(from, { replace: true });
      
    } catch (err) {
      setError(err.msg || "Login Failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-4 sm:px-0">
        <div className="overflow-hidden shadow-xl border-0 bg-white/80 backdrop-blur-sm rounded-lg">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
            <div className="flex items-center justify-center py-3">
              <LogIn className="h-8 w-8 text-white mr-2" />
              <h1 className="text-2xl font-bold text-white">Student Login</h1>
            </div>
          </div>

          <div className="p-8">
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">Enter your credentials</h2>
            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

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
                <LogIn className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
                <span>Login</span>
              </button>
            </form>

            <div className="mt-6 text-center">
              <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
                Forgot your password?
              </a>
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="text-indigo-600 hover:text-indigo-800 font-medium">
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;