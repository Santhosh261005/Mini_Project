// src/pages/Signup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Import your API function if you have one
// import { signupUser } from "../api/api";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    rollNumber: "",
    contactNumber: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Simulate signup for demonstration (replace with your API call)
    alert("Signup successful!");
    navigate("/login");

    // Example with API call:
    // try {
    //   const response = await signupUser(formData);
    //   alert(response.msg);
    //   navigate("/login");
    // } catch (err) {
    //   setError(err.response?.data?.msg || "Signup failed.");
    // }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Student Signup</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="w-full p-2 border rounded mt-2"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="rollNumber"
            placeholder="Roll Number"
            className="w-full p-2 border rounded mt-2"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            className="w-full p-2 border rounded mt-2"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
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

export default Signup;