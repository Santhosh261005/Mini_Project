import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminSignupUser } from "../api/adminApi"; // Import the API function

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    orphanageName: '',
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
      alert(response.msg); // Success message from backend
      navigate("/admin-login");
    } catch (err) {
      setError(err.message);
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Admin Signup</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="orphanageName"
            placeholder="Orphanage Name"
            className="w-full p-2 border rounded mt-2"
            onChange={handleChange}
            required
          />
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
      </div>
    </div>
  );
};

export default AdminSignup;