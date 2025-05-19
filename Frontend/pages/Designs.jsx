import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import DesignerNavbar_User from "../components/DesignerNavbar_User";

const Designs = () => {
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const res = await fetch("http://localhost:5001/designs");
        const data = await res.json();
        setDesigns(data);
      } catch (err) {
        console.error("Failed to fetch designs:", err);
      }
    };

    fetchDesigns();
  }, []);

  return (
    <div>
      <DesignerNavbar_User />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-6">Designs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {designs.map((design) => (
            <div
              key={design._id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow"
            >
              <img
                src={design.img || "/placeholder.png"}
                alt={design.design_name}
                className="h-64 w-full object-cover"
                onError={(e) => {
                  e.target.src = "/placeholder.png";
                }}
              />
              <div className="p-4 space-y-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  {design.design_name}
                </h2>
                <p className="text-gray-600">
                  <span className="font-medium">Category:</span> {design.category}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Description:</span> {design.description}
                </p>
                <p className="text-gray-800 font-semibold">₹{design.price}</p>
                <p className="text-gray-600">
                  <span className="font-medium">Designer:</span> {design.designer_name}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Email:</span> {design.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Designs;
