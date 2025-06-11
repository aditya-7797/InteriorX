import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user_email");
    localStorage.setItem("preferencesSubmitted", "false");
    navigate("/login");
  };

  const authtoken = localStorage.getItem("authToken");
  const user_email = localStorage.getItem("user_email");

  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between">
      {/* Left side nav links */}
      <div className="flex space-x-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-black font-medium border-b-2 border-black pb-1"
              : "text-gray-600 font-medium"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive
              ? "text-black font-medium border-b-2 border-black pb-1"
              : "text-gray-600 font-medium"
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/designs"
          className={({ isActive }) =>
            isActive
              ? "text-black font-medium border-b-2 border-black pb-1"
              : "text-gray-600 font-medium"
          }
        >
          Designs
        </NavLink>

                <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "text-black font-medium border-b-2 border-black pb-1"
              : "text-gray-600 font-medium"
          }
        >
          About Us
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "text-black font-medium border-b-2 border-black pb-1"
              : "text-gray-600 font-medium"
          }
        >
          Contact
        </NavLink>
        

      </div>

      {/* Right side login/logout */}
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

export default Navbar;
