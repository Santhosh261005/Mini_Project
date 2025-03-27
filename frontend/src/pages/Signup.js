import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [role, setRole] = useState("user");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>

        {/* Role Selection */}
        <div className="flex justify-center mb-4">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <input type="text" placeholder="Full Name" className="input-field" />
          <input type="text" placeholder="Roll Number" className="input-field" />
          <input type="text" placeholder="Contact Number" className="input-field" />
          <input type="email" placeholder="Email" className="input-field" />
          <input type="password" placeholder="Password" className="input-field" />

          <button className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
