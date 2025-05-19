import React, { useState } from "react";
import SellerNavbar from "../components/sellerNavbar";

const AddDesigns = () => {
  const [formData, setFormData] = useState({
    designer_name: "",
    email: "",
    design_name: "",
    description: "",
    category: "",
    price: "",
    designProducts: "", // 👈 Add this line
  });

  const [img, setImg] = useState(null);
  const [preview, setPreview] = useState(null);

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

    if (!img) {
      alert("Please upload an image!");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
  if (key === "designProducts") {
    const productIds = value
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id);
    data.append("designProducts", JSON.stringify(productIds)); // 👈 Important
  } else {
    data.append(key, value);
  }
});

    data.append("img", img); // MUST match backend field name

    try {
      const res = await fetch("http://localhost:5001/designs", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Failed to submit design");

      alert("✅ Design submitted!");
      resetForm();
    } catch (err) {
      console.error("❌ Error submitting:", err);
      alert("Something went wrong.");
    }
  };

  const resetForm = () => {
    setFormData({
  designer_name: "",
  email: "",
  design_name: "",
  description: "",
  category: "",
  price: "",
  designProducts: "", // ✅ Add this
});

    setImg(null);
    setPreview(null);
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
        <h2 className="text-2xl font-bold text-center">Add New Design</h2>

        <input
          name="designer_name"
          placeholder="Designer Name"
          value={formData.designer_name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="design_name"
          placeholder="Design Name"
          value={formData.design_name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="designProducts"
          placeholder="Product IDs (comma separated)"
          value={formData.designProducts}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <label htmlFor="file-input" className="block mb-2">
          Upload Design Image/
        </label>
       <input
  id="file-input"
  type="file"
  name="img" // ✅ Required
  accept="image/*"
  onChange={handleImageChange}
  className="w-full p-2 border rounded"
/>


        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="h-32 object-cover mt-2 rounded"
          />
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Submit Design
        </button>
      </form>
    </div>
  );
};

export default AddDesigns;