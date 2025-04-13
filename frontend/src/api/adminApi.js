const API_BASE_URL = "http://localhost:5000/routes/admin"; // Change if deployed

export const adminSignupUser = async (adminData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adminData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg || "Admin signup failed.");
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const adminLoginUser = async (loginData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.msg || "Admin login failed.");
      }
  
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };