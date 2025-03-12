import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-center space-x-6">
      <NavLink to="/" className={({ isActive }) => 
        isActive ? "text-black font-medium border-b-2 border-black pb-1" : "text-gray-600 font-medium"}
      >Home</NavLink>
      <NavLink to="/products" className={({ isActive }) => 
        isActive ? "text-black font-medium border-b-2 border-black pb-1" : "text-gray-600 font-medium"}
      >Products</NavLink>
      <NavLink to="/designers" className={({ isActive }) => 
        isActive ? "text-black font-medium border-b-2 border-black pb-1" : "text-gray-600 font-medium"}
      >Designers</NavLink>
      <NavLink to="/designs" className={({ isActive }) => 
        isActive ? "text-black font-medium border-b-2 border-black pb-1" : "text-gray-600 font-medium"}
      >Designs</NavLink>
      <NavLink to="/login" className={({ isActive }) => 
        isActive ? "text-black font-medium border-b-2 border-black pb-1" : "text-gray-600 font-medium"}
      >Login</NavLink>
    </nav>
  );
};

export default Navbar;
