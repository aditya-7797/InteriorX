import React from "react";
import { motion } from "framer-motion";
import DesignerNavbar_User from "../components/DesignerNavbar_User";
import { NavLink, useNavigate } from "react-router-dom";


const CardComponent = ({ title, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="cursor-pointer w-full max-w-md p-6"
  >
    <div className="rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white">
      <div className="p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
      </div>
    </div>
  </motion.div>
);

const Generate_Design = () => {
  const handleViewDesign = () => {
    console.log("Navigating to View Design page");
    navigate("/image_search")
  };

  const handleGenerateDesign = () => {
    console.log("Navigating to Generate Design page");
    // implement navigation or action
  };

  return (
    <>
    <DesignerNavbar_User/>
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CardComponent title="View Design based on Prompt" onClick={handleViewDesign} />
        <CardComponent title="Generate Design based on Prompt" onClick={handleGenerateDesign} />
      </div>
    </div>
    </>
  );
};

export default Generate_Design;
