import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">LOGIN</h2>

        {/* Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Login as:</label>
          <select
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Seller</option>
            <option value="guest">Designer</option>
          </select>
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

        {/* Password Input */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
          Submit
        </button>

        {/* Signup Link */}
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
