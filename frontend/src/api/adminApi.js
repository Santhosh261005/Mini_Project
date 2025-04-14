const API_BASE_URL = "http://localhost:5000/api/admin"; // Change if deployed

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

export const getOrphanageDetails = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/orphanage`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg || "Failed to fetch orphanage details");
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateOrphanageDetails = async (details) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orphanage`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(details)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg || "Failed to update orphanage details");
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
