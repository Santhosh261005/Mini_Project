import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

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
  };

  return (
    <div className="min-h-screen bg-white p-8 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-lg w-full">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
          <h1 className="text-2xl font-bold text-white text-center">Donate Now</h1>
        </div>
        <div className="p-6">
          <p className="text-gray-600 text-center mt-2">
            Your small act of kindness can bring a big change. Choose what you
            want to donate and spread happiness!
          </p>

          {/* Donation Form */}
          <form className="mt-6" onSubmit={handleSubmit}>
            {/* Select Donation Type */}
            <label className="block text-gray-700 font-semibold">
              What would you like to donate?
            </label>
            <select
              className="w-full mt-2 p-3 border rounded-lg"
              value={donationType}
              onChange={(e) => setDonationType(e.target.value)}
            >
              <option value="books">📚 Books</option>
              <option value="clothes">👕 Clothes</option>
              <option value="stationery">✏ Stationery</option>
              <option value="toys">🧸 Toys</option>
              <option value="others">🔄 Others</option>
            </select>

            {/* Quantity */}
            <div className="mt-4">
              <label className="block text-gray-700 font-semibold">Quantity</label>
              <div className="flex items-center mt-2">
                <button
                  type="button"
                  onClick={handleDecrement}
                  className="p-2 rounded-l-md bg-gray-100 text-gray-600 hover:bg-gray-200"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  type="number"
                  min="0"
                  value={quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    if (!isNaN(value) && value >= 0) {
                      setQuantity(value);
                    } else if (e.target.value === "") {
                      setQuantity("");
                    }
                  }}
                  className="w-20 p-2 text-center border-y"
                />
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="p-2 rounded-r-md bg-gray-100 text-gray-600 hover:bg-gray-200"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Description */}
            <label className="block text-gray-700 font-semibold mt-4">
              Description
            </label>
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
              className="w-full mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
            >
              Submit Donation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonateNow;
