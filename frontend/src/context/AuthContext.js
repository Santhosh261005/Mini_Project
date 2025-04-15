import React, { createContext, useState, useContext } from 'react';

// 1. Create context
export const AuthContext = createContext();

// 2. Provider component to wrap the app
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom hook to use context values easily
export const useAuth = () => useContext(AuthContext);
