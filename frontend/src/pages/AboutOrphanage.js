// src/pages/AboutOrphanage.js
import React from 'react';

const AboutOrphanage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">About the Orphanage</h2>
        <p>Orphanage Details:</p>
        <p>Name: Example Orphanage</p>
        <p>Address: 123 Example Street</p>
        {/* Add more details here */}
      </div>
    </div>
  );
};

export default AboutOrphanage;