import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Navbar from "../components/Navbar"; // Optional if you're using a shared navbar

const DonateNow = () => {
  const [donationType, setDonationType] = useState("books");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (quantity <= 0) {
      alert("Please enter a quantity greater than 0.");
      return;
    }

    alert(`Thank you for donating ${quantity} ${donationType}! 🎉`);
    setDonationType("books");
    setDescription("");
    setQuantity(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 flex flex-col items-center justify-center py-12 px-4">
      {/* Optional Navbar */}
      {/* <Navbar /> */}

      <div className="bg-white shadow-xl rounded-xl w-full max-w-xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-indigo-700">Donate Now</h1>
        <p className="text-gray-600 text-center mt-2">
          Your small act of kindness can bring a big change. Choose what you
          want to donate and spread happiness!
        </p>

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          {/* Donation Type */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              What would you like to donate?
            </label>
            <select
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={donationType}
              onChange={(e) => setDonationType(e.target.value)}
            >
              <option value="books">📚 Books</option>
              <option value="clothes">👕 Clothes</option>
              <option value="stationery">✏️ Stationery</option>
              <option value="toys">🧸 Toys</option>
              <option value="others">🔄 Others</option>
            </select>
          </div>

          {/* Quantity Selector */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Quantity</label>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handleDecrement}
                className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700"
              >
                <Minus className="h-5 w-5" />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  if (!isNaN(val) && val >= 0) setQuantity(val);
                }}
                className="w-16 text-center border p-2 rounded-md"
              />
              <button
                type="button"
                onClick={handleIncrement}
                className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Description</label>
            <textarea
              rows="4"
              placeholder="Provide more details about your donation..."
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition duration-200 shadow-md"
          >
            Submit Donation
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonateNow;
