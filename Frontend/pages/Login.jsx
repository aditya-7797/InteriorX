import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../useAuth";
import Navbar from "../components/Navbar"; // Adjust the import path as necessary

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [role, setRole] = useState("user"); // Default role
  const navigate = useNavigate();
  const { storeTokenInLS, storeEmailInLS } = useAuth();



  const handleSubmit = async (e) => {
    e.preventDefault();

    let apiRoute = "";
    if (role === "user") {
      apiRoute = "http://localhost:5001/auth/login/user";
    } else if (role === "seller") {
      apiRoute = "http://localhost:5001/auth/login/seller";
    } else if (role === "designer") {
      apiRoute = "http://localhost:5001/auth/login/designer";
    }

    try {
      const response = await fetch(apiRoute, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
          role,
        }),
      });

      const res_data = await response.json();
      if (response.ok) {
        console.log("Response from server:", res_data);
        // console.log("Response from server:", res_data.token);
        // console.log("Response from server:", res_data.email);

        // Assuming this is only for token
        // Navigate based on role
        if (role === "user") {
          storeTokenInLS(res_data.token); 
          storeEmailInLS(res_data.email); 
          const hasSubmitted = localStorage.getItem("preferencesSubmitted");
          if (!hasSubmitted) {
            localStorage.setItem("showStylePopup", "true");
          }
          navigate("/");
        } else if (role === "seller") {
          storeTokenInLS(res_data.token); 
          storeEmailInLS(res_data.seller.email); 
          navigate("/seller_home");
        } else if (role === "designer") {
          storeTokenInLS(res_data.token); 
          storeEmailInLS(res_data.designer.email); 
          navigate("/designer_home");
        }
      } else {
        console.error("Login failed:", res_data.msg);
      }
    } catch (error) {
      console.error("Error during Login:", error);
    }
  };

  return (
    <>
    <Navbar />
    <div className="flex justify-center items-center h-screen bg-gray-100">


      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">LOGIN</h2>
        <form onSubmit={handleSubmit}>
          {/* Role Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Login as:</label>
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

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email:</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
    </>
  );
};

export default Login;
