import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api"; // Import API function

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginUser(formData);
      localStorage.setItem("token", response.token); // Store JWT Token
      alert("Login successful!");
      navigate("/dashboard"); // Redirect to dashboard after login
    } catch (err) {
      setError(err.msg || "Invalid credentials. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" className="w-full p-2 border rounded mt-2" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" className="w-full p-2 border rounded mt-2" onChange={handleChange} required />

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
