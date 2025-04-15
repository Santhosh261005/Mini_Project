import React, { useState, useEffect } from "react";
import { Plus, Minus, Trash2, PlusCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { postDonation } from "../api/api";

const DonateNow = () => {
  const allDonationTypes = ["books", "clothes", "stationery", "toys", "others"];
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Parse NGO ID from query parameters
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ngoId = queryParams.get("ngoId");

  // Get available donation types (all types minus those already selected)
  const getAvailableTypes = () => {
    const selectedTypes = items.map(item => item.donationType);
    return allDonationTypes.filter(type => !selectedTypes.includes(type));
  };

  // Initialize with first available type if empty
  useEffect(() => {
    if (items.length === 0 && getAvailableTypes().length > 0) {
      setItems([{
        id: Date.now(),
        donationType: getAvailableTypes()[0],
        description: "",
        quantity: ""
      }]);
    }
  }, [items]);

  const handleIncrement = (id) => {
    setItems(items.map(item => 
      item.id === id 
        ? { ...item, quantity: (parseInt(item.quantity) || 0) + 1 }
        : item
    ));
  };

  const handleDecrement = (id) => {
    setItems(items.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max((parseInt(item.quantity) || 0) - 1, 0) }
        : item
    ));
  };

  const handleItemChange = (id, field, value) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const addNewItem = () => {
    const availableTypes = getAvailableTypes();
    if (availableTypes.length > 0) {
      setItems([
        ...items,
        {
          id: Date.now(),
          donationType: availableTypes[0],
          description: "",
          quantity: ""
        }
      ]);
    }
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate at least one item has quantity > 0
    const validItems = items.filter(item => {
      const qty = parseInt(item.quantity);
      return !isNaN(qty) && qty > 0;
    });

    if (validItems.length === 0) {
      alert("Please enter valid quantities for at least one item.");
      return;
    }

    const donationData = {
      ngoId: ngoId || null,
      items: validItems.map(item => ({
        donationType: item.donationType,
        description: item.description,
        quantity: parseInt(item.quantity)
      }))
    };

    try {
      setLoading(true);
      await postDonation(donationData);
      alert(`Thank you for donating ${validItems.length} items! 🎉`);
      setItems([
        {
          id: Date.now(),
          donationType: "books",
          description: "",
          quantity: ""
        }
      ]);
    } catch (err) {
      setError(err.msg || "Failed to submit donation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-200 to-indigo-300 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4">
          <h1 className="text-2xl font-bold text-white text-center">Donate Now</h1>
        </div>

        <div className="p-6">
          <p className="text-gray-600 text-center">
            Your small act of kindness can bring a big change. Choose what you
            want to donate and spread happiness!
          </p>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
              {error}
            </div>
          )}

          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            {items.map((item, index) => (
              <div key={item.id} className="border-b pb-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-700">Item {index + 1}</h3>
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>

                {/* Donation Type */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    What would you like to donate?
                  </label>
                  <select
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    value={item.donationType}
                    onChange={(e) => handleItemChange(item.id, 'donationType', e.target.value)}
                  >
                    {getAvailableTypes().concat(item.donationType).map(type => (
                      <option key={type} value={type}>
                        {type === "books" && "📚 Books"}
                        {type === "clothes" && "👕 Clothes"}
                        {type === "stationery" && "✏️ Stationery"}
                        {type === "toys" && "🧸 Toys"}
                        {type === "others" && "🔄 Others"}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity Selector */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Quantity</label>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => handleDecrement(item.id)}
                      className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700"
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => {
                        const val = e.target.value;
                        handleItemChange(item.id, 'quantity', val === '' ? '' : parseInt(val) || 0);
                      }}
                      min="0"
                      className="w-16 text-center border p-2 rounded-md"
                      placeholder="0"
                    />
                    <button
                      type="button"
                      onClick={() => handleIncrement(item.id)}
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
                    rows="3"
                    placeholder="Provide more details about your donation..."
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    value={item.description}
                    onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addNewItem}
              className="flex items-center justify-center w-full py-2 text-indigo-600 hover:text-indigo-800 font-medium"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Add Another Item
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition duration-200 shadow-md ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? "Submitting..." : "Submit Donation"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonateNow;