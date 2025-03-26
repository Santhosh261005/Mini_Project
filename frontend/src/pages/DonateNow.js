import React, { useState } from "react";

const Donate = () => {
  const [donationType, setDonationType] = useState("books");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your donation! 🎉");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 to-blue-300 p-8 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Donate Now
        </h1>
        <p className="text-gray-600 text-center mt-2">
          Your small act of kindness can bring a big change. Choose what you
          want to donate and spread happiness!
        </p>

        {/* Donation Form */}
        <form className="mt-6" onSubmit={handleSubmit}>
          {/* Select Donation Type */}
          <label className="block text-gray-700 font-semibold">What would you like to donate?</label>
          <select
            className="w-full mt-2 p-3 border rounded-lg"
            value={donationType}
            onChange={(e) => setDonationType(e.target.value)}
          >
            <option value="books">📚 Books</option>
            <option value="clothes">👕 Clothes</option>
            <option value="stationery">✏️ Stationery</option>
            <option value="toys">🧸 Toys</option>
            <option value="others">🔄 Others</option>
          </select>

          {/* Description */}
          <label className="block text-gray-700 font-semibold mt-4">Description</label>
          <textarea
            className="w-full mt-2 p-3 border rounded-lg"
            rows="4"
            placeholder="Provide more details about your donation..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition"
          >
            Submit Donation
          </button>
        </form>
      </div>
    </div>
  );
};

export default Donate;
