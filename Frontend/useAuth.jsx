import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);
  const [email, setEmail] = useState(localStorage.getItem("user_email") || null);

  // ✅ Save token to localStorage
  const storeTokenInLS = (token) => {
    localStorage.setItem("authToken", token);
    setToken(token);
  };

  // ✅ Save email to localStorage
  const storeEmailInLS = (email) => {
    localStorage.setItem("user_email", email);
    setEmail(email);
  };

  // ✅ Remove all auth info on logout
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user_email");
    setToken(null);
    setEmail(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, email, storeTokenInLS, storeEmailInLS, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
