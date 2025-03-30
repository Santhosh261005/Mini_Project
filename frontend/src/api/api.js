import axios from "axios";

// Base URL of your backend (Change if running on a different port)
const API_URL = "http://localhost:5000/api/auth";

// Signup API Call
export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
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
