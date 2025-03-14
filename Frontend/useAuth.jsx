import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);

  // ✅ Save token in localStorage
  const storeTokenInLS = (token) => {
    localStorage.setItem("authToken", token);
    setToken(token);
  };

  // ✅ Remove token when user logs out
  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, storeTokenInLS, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook to use auth
export const useAuth = () => useContext(AuthContext);
