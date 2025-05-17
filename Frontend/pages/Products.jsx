import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const email = localStorage.getItem("email");
      const res = await fetch(`http://localhost:5001/products?`);
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (

    <div>
      <Navbar/>
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow"
          >
            <img
              src={product.img}
              alt={product.productname}
              className="h-64 w-full object-cover"
            />
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold text-gray-800">
                {product.productname}
              </h2>
              <p className="text-gray-600">
                <span className="font-medium">Category:</span> {product.category}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Description:</span> {product.description}
              </p>
              <p className="text-gray-800 font-semibold">
                ₹{product.price}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Seller:</span> {product.sellername}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Email:</span> {product.email}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    
  );
};

export default Products;
