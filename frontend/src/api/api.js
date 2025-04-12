import axios from "axios";

// Base URL of your backend (Change if running on a different port)
const API_URL = "http://localhost:5000/routes/auth";

export const signup = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/Signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    return await response.json();
  } catch (error) {
    console.error("Signup API Error:", error.message);
    throw error;
  }
};

// Login API Call
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Fetch User Stats API Call
export const fetchUserStats = async () => {
  try {
    const token = localStorage.getItem("token"); // Ensure the user is authenticated
    const response = await axios.get("http://localhost:5000/api/user/stats", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("User Stats API Error:", error.response?.data || error.message);
    throw error.response?.data || { msg: "Failed to fetch user stats" };
  }
};
