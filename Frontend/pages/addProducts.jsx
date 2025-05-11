import React, { useState, useEffect } from "react";
import SellerNavbar from "../components/sellerNavbar";

const AddProducts = () => {
  const [formData, setFormData] = useState({
    sellername: "",
    productname: "",
    email: "",
    description: "",
    category: "",
    price: "",
  });

  const [img, setImg] = useState(null);
  const [preview, setPreview] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const sellerEmail = localStorage.getItem("user_email");

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5001/products");
      const data = await res.json();
  
      // Only keep products added by the currently logged-in seller
      const sellerProducts = data.filter(product => product.email === sellerEmail);
  
      setProducts(sellerProducts);
      setFilteredProducts(sellerProducts);
    } catch (err) {
      console.error("❌ Error fetching products:", err);
    }
  };
  

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((p) =>
      p.productname.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [search, products]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImg(file);
      setPreview(URL.createObjectURL(file));
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (img && img instanceof File) {
      data.append("img", img);
    }

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `http://localhost:5001/products/${editingId}`
        : "http://localhost:5001/products";

      if (!editingId && !img) {
        alert("Please upload an image!");
        return;
      }

      const res = await fetch(url, {
        method,
        body: data,
      });

      if (!res.ok) throw new Error("Failed to submit data");

      alert(editingId ? "✅ Product updated!" : "✅ Product added!");
      resetForm();
      fetchProducts();
    } catch (err) {
      console.error("❌ Error submitting:", err);
      alert("Something went wrong.");
    }
  };

  const handleEdit = (product) => {
    setFormData({
      sellername: product.sellername,
      productname: product.productname,
      email: product.email,
      description: product.description,
      category: product.category,
      price: product.price,
    });
    setPreview(product.img);
    setImg(null);
    setEditingId(product._id);
    document.getElementById("file-input").value = "";
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      alert("🗑️ Product deleted!");
      fetchProducts();
    } catch (err) {
      console.error("❌ Error deleting:", err);
      alert("Delete failed.");
    }
  };

  const resetForm = () => {
    setFormData({
      sellername: "",
      productname: "",
      email: "",
      description: "",
      category: "",
      price: "",
    });
    setImg(null);
    setPreview(null);
    setEditingId(null);
    document.getElementById("file-input").value = "";
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <SellerNavbar />
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg mx-auto space-y-4"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold text-center">
          {editingId ? "Edit Product" : "Add New Product"}
        </h2>

        <input name="sellername" placeholder="Name" value={formData.sellername} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="productname" placeholder="Product" value={formData.productname} onChange={handleChange} required className="w-full p-2 border rounded" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="price" placeholder="Price" value={formData.price} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input id="file-input" type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded" />

        {preview && <img src={preview} alt="Preview" className="h-32 object-cover mt-2 rounded" />}

        <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
          {editingId ? "Update Product" : "Submit Product"}
        </button>
      </form>

      <div className="max-w-lg mx-auto mt-6">
        <input
          type="text"
          placeholder="🔍 Search by product name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="max-w-4xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product._id} className="bg-white p-4 rounded shadow">
            <img src={product.img} alt={product.productname} className="h-40 w-full object-cover rounded" />
            <h3 className="font-bold mt-2">{product.productname}</h3>
            <p>{product.description}</p>
            <p className="text-sm text-gray-600">Price: ₹{product.price}</p>
            <div className="flex justify-between mt-2">
              <button onClick={() => handleEdit(product)} className="text-blue-600">Edit</button>
              <button onClick={() => handleDelete(product._id)} className="text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddProducts;
