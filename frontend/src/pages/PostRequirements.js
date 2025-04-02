// src/pages/PostRequirements.js
import React, { useState } from 'react';

const PostRequirements = () => {
  const [requirements, setRequirements] = useState({
    books: 0,
    clothes: 0,
    toys: 0,
    stationary: 0,
    // Add more requirements as needed
  });

  const handleChange = (e) => {
    setRequirements({ ...requirements, [e.target.name]: parseInt(e.target.value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(requirements); // Replace with your API call
    alert('Requirements posted!');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Post Requirements</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Books:</label>
            <input
              type="number"
              name="books"
              value={requirements.books}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Clothes:</label>
            <input
              type="number"
              name="clothes"
              value={requirements.clothes}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Toys:</label>
            <input
              type="number"
              name="toys"
              value={requirements.toys}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Stationary:</label>
            <input
              type="number"
              name="stationary"
              value={requirements.stationary}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600">
            Post Requirements
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostRequirements;