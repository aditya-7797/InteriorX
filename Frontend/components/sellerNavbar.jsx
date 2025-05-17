import React from "react";
import { NavLink ,useNavigate} from "react-router-dom";

const SellerNavbar = () => {

  const navigate = useNavigate();

  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-black font-medium border-b-2 border-black pb-1"
      : "text-gray-600 font-medium";

    const authtoken = localStorage.getItem("authToken");
     const user_email = localStorage.getItem("user_email");

      const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user_email");
        localStorage.setItem("preferencesSubmitted", "false");
        navigate("/login");
      };
        

  return (
    <nav className="bg-white shadow-md p-4 flex justify-center space-x-6">
      <NavLink to="/seller_home" className={linkStyle}>Dashboard</NavLink>
      <NavLink to="/view_requirement" className={linkStyle}>View User Requirements</NavLink>
      <NavLink to="/add_product" className={linkStyle}>Add Product</NavLink>
      <div>
              {(authtoken || user_email) ? (
                <button
                  onClick={handleLogout}
                  className="text-gray-600 font-medium hover:text-black transition"
                >
                  Logout
                </button>
              ) : (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-black font-medium border-b-2 border-black pb-1"
                      : "text-gray-600 font-medium"
                  }
                >
                  Login
                </NavLink>
              )}
            </div>
    </nav>
  );
};

export default SellerNavbar;
