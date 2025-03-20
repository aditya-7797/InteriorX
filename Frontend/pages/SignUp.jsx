import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../useAuth";

const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    mobileno: "",
    password: "",
  });

  const [role, setRole] = useState("user"); // Default role
  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();
  // ✅ Call useAuth correctly

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let apiRoute = "";
    if (role === "user") {
      apiRoute = "http://localhost:5001/auth/signup/user";
    } else if (role === "seller") {
      apiRoute = "http://localhost:5001/auth/signup/seller";
    } else if (role === "designer") {
      apiRoute = "http://localhost:5001/auth/signup/designer";
    }

    try {
      const response = await fetch(apiRoute, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: user.username,
          email: user.email,
          phone: user.mobileno, 
          password: user.password,
          role,
        }),
      });

      const res_data = await response.json();
      if (response.ok) {
        console.log("Response from server:", res_data);
        storeTokenInLS(res_data.token);
        navigate("/login");
      } else {
        console.error("Registration failed:", res_data.msg);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">SIGN UP</h2>

        <form onSubmit={handleSubmit}>
          {/* Role Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Select Role:</label>
            <select
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="seller">Seller</option>
              <option value="designer">Designer</option>
            </select>
          </div>

          {/* Username Input */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Username:</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleInput}
              placeholder="Enter your username"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInput}
              placeholder="Enter your email"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Mobile Number Input */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Mobile Number:</label>
            <input
              type="tel"
              name="mobileno"
              value={user.mobileno}
              onChange={handleInput}
              placeholder="Enter your mobile number"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Password:</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInput}
              placeholder="Enter your password"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </form>

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
