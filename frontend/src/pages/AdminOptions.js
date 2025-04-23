import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, Info, ArrowRight, LogOut, Shield } from 'lucide-react';

const AdminOptions = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-600 via-blue-500 to-blue-400">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-green-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-700 to-green-900 rounded-t-lg shadow-lg p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Shield className="h-8 w-8 text-white mr-2" />
                <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              </div>
              <Link to="/" className="flex items-center text-white hover:text-green-300 transition-colors">
                <LogOut className="h-5 w-5 mr-1" />
                <span>Logout</span>
              </Link>
            </div>
          </div>
          
          {/* Main content */}
          <div className="bg-white/80 backdrop-blur-sm rounded-b-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Administrative Options</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Post Requirements Card */}
              <Link to="/post-requirements" className="group">
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 hover:from-green-100 hover:to-emerald-200 border border-green-200 rounded-lg p-6 transition-all duration-300 shadow-md hover:shadow-lg h-full">
                  <div className="flex items-start mb-4">
                    <div className="bg-green-500 rounded-lg p-3">
                      <ClipboardList className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-xl font-medium text-gray-800">Post Requirements</h3>
                      <p className="text-gray-600 mt-1">Publish new requests for donations and assistance</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-green-600 transform transition-transform group-hover:translate-x-1" />
                  </div>
                  <div className="bg-white/50 rounded-lg p-4 mt-2">
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li className="flex items-center">
                        <div className="w-1 h-1 bg-green-500 rounded-full mr-2"></div>
                        <span>Create donation requests</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-1 h-1 bg-green-500 rounded-full mr-2"></div>
                        <span>Set donation targets</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-1 h-1 bg-green-500 rounded-full mr-2"></div>
                        <span>Track donation progress</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Link>
              
              {/* About Orphanage Card */}
              <Link to="/about-orphanage" className="group">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 hover:from-blue-100 hover:to-indigo-200 border border-blue-200 rounded-lg p-6 transition-all duration-300 shadow-md hover:shadow-lg h-full">
                  <div className="flex items-start mb-4">
                    <div className="bg-blue-500 rounded-lg p-3">
                      <Info className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-xl font-medium text-gray-800">About Orphanage</h3>
                      <p className="text-gray-600 mt-1">Update information about your organization</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-blue-600 transform transition-transform group-hover:translate-x-1" />
                  </div>
                  <div className="bg-white/50 rounded-lg p-4 mt-2">
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li className="flex items-center">
                        <div className="w-1 h-1 bg-blue-500 rounded-full mr-2"></div>
                        <span>Edit organization details</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-1 h-1 bg-blue-500 rounded-full mr-2"></div>
                        <span>Update mission statement</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-1 h-1 bg-blue-500 rounded-full mr-2"></div>
                        <span>Modify contact information</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          
          <p className="text-center text-gray-500 text-sm mt-6">
            
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminOptions;
