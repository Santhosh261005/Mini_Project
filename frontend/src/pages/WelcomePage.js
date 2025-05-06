import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, LogIn, UserPlus, Shield } from 'lucide-react';
import { useAuth } from "../context/AuthContext"; // adjust path accordingly

const WelcomePage = () => {
  const { setIsAuthenticated } = useAuth();
  
  useEffect(() => {
    // Force logout when visiting welcome page
    localStorage.removeItem('authToken');
    setIsAuthenticated(false); // Ensure the state is set to false
  }, [setIsAuthenticated]);

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50" 
      style={{
        backgroundImage: 'url("https://i.imgur.com/DZf3M0k.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-4 sm:px-0">
        <div className="overflow-hidden shadow-xl border-0 bg-white/80 backdrop-blur-sm rounded-lg">
          <div className="bg-[#f5ce88] p-4">
            <div className="flex items-center justify-center py-3">
              <GraduationCap className="h-8 w-8 text-white mr-2" />
              <h1 className="text-2xl font-bold text-white animate-slide-in-top">Campus Connect</h1>
            </div>
          </div>
          
          <div className="p-8">
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-6 animate-slide-in-left">Where Kind meets Needy</h2>
            
            <div className="space-y-4">
              <Link to="/login" className="flex items-center justify-center w-full bg-gradient-to-r from-[#ea8788] to-[#ea8788] hover:from-[#ea8788] hover:to-[#ea8788] transition-all duration-300 h-12 rounded-md shadow-md hover:shadow-lg group text-white p-2">
                <LogIn className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
                <span>Student Login</span>
              </Link>
              
              <div className="relative py-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-sm text-gray-500 animate-slide-in-left">NGO Login</span>
                </div>
              </div>
              
              <Link to="/admin-login" className="flex items-center justify-center w-full border border-amber-500 text-amber-700 hover:bg-amber-50 transition-all duration-300 h-12 rounded-md shadow-sm hover:shadow-md group p-2">
                <Shield className="mr-2 h-5 w-5 transition-all group-hover:text-amber-600" />
                <span>Admin Login</span>
              </Link>
            </div>
          </div>

          {/* Sign up section */}
          <div className="mb-10 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account? 
              <Link to="/signup" className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200"> Sign Up</Link>
              <br />
              Admin? <Link to="/admin-signup" className="text-amber-600 hover:text-amber-800 transition-colors duration-200">Create an Account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
