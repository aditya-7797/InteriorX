import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [selectedRole, setSelectedRole] = useState("");

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">SIGN UP</h2>

        {/* Role Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Select Role:</label>
          <select
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Seller</option>
            <option value="guest">Designer</option>
          </select>
        </div>

        {/* Username Input */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Username:</label>
          <input
            type="text"
            placeholder="Enter your username"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Mobile Number Input */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Mobile Number:</label>
          <input
            type="tel"
            placeholder="Enter your mobile number"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Signup Button */}
        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
          Sign Up
        </button>

        {/* Login Link */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
