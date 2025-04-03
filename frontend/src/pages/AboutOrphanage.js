import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Phone, Mail, Users, Calendar, Heart, MapPin } from 'lucide-react';

const AboutOrphanage = () => {
  const navigate = useNavigate();

  const orphanageDetails = {
    name: "Sunshine Children's Home",
    established: "1995",
    address: "123 Hope Street, Cityville, State 12345",
    phone: "+1 (555) 123-4567",
    email: "contact@sunshinechildren.org",
    website: "www.sunshinechildren.org",
    children: "45 children (ages 3-17)",
    staff: "15 full-time staff members",
    director: "Dr. Sarah Johnson",
    mission: "To provide a loving, supportive, and educational environment for orphaned and vulnerable children, empowering them to become confident and productive members of society.",
    needs: "Volunteers, educational materials, clothing, toys, and financial support",
    accreditation: "Licensed by the State Department of Child Services"
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-slate-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
        <button 
          onClick={() => navigate('/admin-options')}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </button>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-blue-700 p-4">
            <h1 className="text-2xl font-bold text-white text-center">About Our Orphanage</h1>
          </div>
          
          <div className="p-6">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{orphanageDetails.name}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {orphanageDetails.mission}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Home className="mr-2 h-5 w-5 text-blue-600" />
                    General Information
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Address:</p>
                        <p className="text-sm text-gray-600">{orphanageDetails.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Phone:</p>
                        <p className="text-sm text-gray-600">{orphanageDetails.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Email:</p>
                        <p className="text-sm text-gray-600">{orphanageDetails.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Established:</p>
                        <p className="text-sm text-gray-600">{orphanageDetails.established}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Users className="mr-2 h-5 w-5 text-blue-600" />
                    Our Community
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Users className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Children:</p>
                        <p className="text-sm text-gray-600">{orphanageDetails.children}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Users className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Staff:</p>
                        <p className="text-sm text-gray-600">{orphanageDetails.staff}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Users className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Director:</p>
                        <p className="text-sm text-gray-600">{orphanageDetails.director}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Heart className="mr-2 h-5 w-5 text-blue-600" />
                    Our Mission & Needs
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Our Mission:</p>
                      <p className="text-sm text-gray-600 mt-1">{orphanageDetails.mission}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-700">Current Needs:</p>
                      <p className="text-sm text-gray-600 mt-1">{orphanageDetails.needs}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Accreditation</h3>
                  <p className="text-sm text-gray-600">{orphanageDetails.accreditation}</p>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-100">
                  <h3 className="text-xl font-semibold text-blue-800 mb-4">How You Can Help</h3>
                  <p className="text-sm text-blue-700 mb-4">
                    Your support can make a significant difference in the lives of our children. 
                    Consider donating supplies, volunteering your time, or providing financial assistance.
                  </p>
                  <button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                    onClick={() => navigate('/post-requirements')}
                  >
                    View Current Needs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-center text-gray-500 text-sm mt-6">
          © 2023 {orphanageDetails.name} - All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default AboutOrphanage;