import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Phone, Mail, Users, Calendar, Heart, MapPin } from 'lucide-react';
import { useSelector } from 'react-redux';
import { getOrphanageDetails, updateOrphanageDetails } from '../api/adminApi';

const AboutOrphanage = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const isAdmin = userInfo?.role === 'admin';

  const [editMode, setEditMode] = useState(false);
  const [orphanageDetails, setOrphanageDetails] = useState({
    orphanageName: "",
    established: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    children: "",
    middleAged: "",
    oldPeople: "",
    staff: "",
    director: "",
    mission: "",
    needs: "",
    accreditation: ""
  });

  useEffect(() => {
    const fetchOrphanageDetails = async () => {
      try {
        const data = await getOrphanageDetails();
        setOrphanageDetails({
          ...data,
          children: `${data.childrenCount} children`,
          middleAged: `${data.middleAgedCount} middle aged people`,
          oldPeople: `${data.oldPeopleCount} old (>60) people`,
          staff: `${data.staffCount} staff members`
        });

        const isEmpty = Object.values(data).every(
          val => val === null || val === undefined || val === ''
        );
        if (isEmpty) {
          setEditMode(true);
        } else {
          setEditMode(false);
        }
      } catch (error) {
        console.error('Error fetching orphanage details:', error);
      }
    };
    fetchOrphanageDetails();
  }, [isAdmin]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrphanageDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await updateOrphanageDetails({
        ...orphanageDetails,
        childrenCount: parseInt(orphanageDetails.children),
        middleAgedCount: parseInt(orphanageDetails.middleAged),
        oldPeopleCount: parseInt(orphanageDetails.oldPeople),
        staffCount: parseInt(orphanageDetails.staff)
      });

      if (response.msg) {
        alert(response.msg);
      }

      setEditMode(false);

      const data = await getOrphanageDetails();
      setOrphanageDetails({
        ...data,
        children: `${data.childrenCount} children`,
        middleAged: `${data.middleAgedCount} middle aged people`,
        oldPeople: `${data.oldPeopleCount} old (>60) people`,
        staff: `${data.staffCount} staff members`
      });

    } catch (error) {
      alert('Failed to save changes: ' + error.message);
      console.error('Error saving orphanage details:', error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-blue-50">
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
        <button 
          onClick={() => navigate(isAdmin ? '/admin-options' : '/')}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to {isAdmin ? 'Dashboard' : 'Home'}
        </button>

        <div className="flex justify-end mb-4">
          {editMode ? (
            <div className="space-x-2">
              <button 
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
              >
                Save Changes
              </button>
              <button 
                onClick={() => setEditMode(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setEditMode(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Edit Information
            </button>
          )}
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden">
          <div className="bg-blue-900 p-4">
            <h1 className="text-2xl font-bold text-white text-center">About Our Orphanage</h1>
          </div>

          <div className="p-6">
            <div className="mb-10 text-center">
              {editMode ? (
                <input
                  type="text"
                  name="orphanageName"
                  value={orphanageDetails.orphanageName}
                  onChange={handleInputChange}
                  className="text-3xl font-bold text-gray-800 mb-4 w-full text-center border-b border-gray-300 focus:outline-none focus:border-blue-500"
                />
              ) : (
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{orphanageDetails.orphanageName}</h2>
              )}
              {editMode ? (
                <textarea
                  name="mission"
                  value={orphanageDetails.mission}
                  onChange={handleInputChange}
                  className="text-gray-600 max-w-2xl mx-auto w-full h-24 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {orphanageDetails.mission}
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border space-y-3">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                    General Information
                  </h3>
                  {[{
                    icon: <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />, label: 'Address', field: 'address'
                  }, {
                    icon: <Phone className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />, label: 'Phone', field: 'phone'
                  }, {
                    icon: <Mail className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />, label: 'Email', field: 'email'
                  }, {
                    icon: <Calendar className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />, label: 'Established', field: 'established'
                  }].map(({ icon, label, field }) => (
                    <div key={field} className="flex items-start">
                      {icon}
                      <div className="w-full">
                        <p className="text-sm font-medium text-gray-700">{label}:</p>
                        {editMode ? (
                          <input
                            type="text"
                            name={field}
                            value={orphanageDetails[field]}
                            onChange={handleInputChange}
                            className="text-sm text-gray-600 w-full border-b border-gray-300 focus:outline-none focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-sm text-gray-600">{orphanageDetails[field]}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border space-y-3">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <Users className="h-5 w-5 text-gray-500 mr-2" />
                    Our Community
                  </h3>
                  {[{
                    icon: <Users className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />, label: 'Children', field: 'children', type: 'number'
                  }, {
                    icon: <Users className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />, label: 'Middle Aged People', field: 'middleAged', type: 'number'
                  }, {
                    icon: <Users className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />, label: 'Old (>60) People', field: 'oldPeople', type: 'number'
                  }].map(({ icon, label, field, type }) => (
                    <div key={field} className="flex items-start">
                      {icon}
                      <div className="w-full">
                        <p className="text-sm font-medium text-gray-700">{label}:</p>
                        {editMode ? (
                          <input
                            type={type}
                            name={field}
                            value={orphanageDetails[field]}
                            onChange={handleInputChange}
                            className="text-sm text-gray-600 w-full border-b border-gray-300 focus:outline-none focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-sm text-gray-600">{orphanageDetails[field]}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border space-y-3">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <Heart className="h-5 w-5 text-gray-500 mr-2" />
                    Our Mission & Needs
                  </h3>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Our Mission:</p>
                    {editMode ? (
                      <textarea
                        name="mission"
                        value={orphanageDetails.mission}
                        onChange={handleInputChange}
                        className="text-sm text-gray-600 w-full h-24 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-sm text-gray-600">{orphanageDetails.mission}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Current Needs:</p>
                    {editMode ? (
                      <textarea
                        name="needs"
                        value={orphanageDetails.needs}
                        onChange={handleInputChange}
                        className="text-sm text-gray-600 w-full h-24 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-sm text-gray-600">{orphanageDetails.needs}</p>
                    )}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border space-y-3">
                  <h3 className="text-lg font-semibold text-gray-800">Accreditation</h3>
                  {editMode ? (
                    <input
                      type="text"
                      name="accreditation"
                      value={orphanageDetails.accreditation}
                      onChange={handleInputChange}
                      className="text-sm text-gray-600 w-full border-b border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-sm text-gray-600">{orphanageDetails.accreditation}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutOrphanage;