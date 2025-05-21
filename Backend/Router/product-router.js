const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../Models/productModel");
const multer = require("multer");

// Multer config (only for image)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// CREATE: Add product
router.post("/", upload.single("img"), async (req, res) => {
  try {
    const { sellername, email, description, productname, category, price } = req.body;

    const lastProduct = await Product.findOne().sort({ productid: -1 }).exec();
    const newProductId = lastProduct ? lastProduct.productid + 1 : 1;

    const imageFile = req.file;

    const newProduct = new Product({
      productid: newProductId,
      sellername,
      email,
      description,
      img: {
        data: imageFile.buffer,
        contentType: imageFile.mimetype,
      },
      productname,
      category,
      price,
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product submitted successfully!",
      productid: newProductId,
    });
  } catch (error) {
    console.error("Error uploading product:", error);
    res.status(500).json({ error: error.message });
  }
});

// READ: Get all or search products
router.get("/", async (req, res) => {
  try {
    const searchQuery = req.query.search || "";
    const regex = new RegExp(searchQuery, "i");

    const products = await Product.find({ productname: regex });

    const formattedProducts = products.map((product) => {
      let base64Image = null;

      if (product.img?.data) {
        const buffer = product.img.data;
        const mimeType = product.img.contentType;
        base64Image = `data:${mimeType};base64,${buffer.toString("base64")}`;
      }

      return {
        _id: product._id,
        sellername: product.sellername,
        email: product.email,
        productname: product.productname,
        description: product.description,
        category: product.category,
        price: product.price,
        img: base64Image,
      };
    });

    res.status(200).json(formattedProducts);
  } catch (error) {
    console.error("❌ Error fetching products:", error.message);
    res.status(500).json({ message: "Server error while fetching products", error: error.message });
  }
});

// READ: Get products by productid list
router.post("/by-ids", async (req, res) => {
  try {
    let { ids } = req.body;

    if (!Array.isArray(ids)) {
      return res.status(400).json({ message: "Expected an array of IDs" });
    }

    ids = ids.map((id) => Number(id));

    const products = await Product.find({ productid: { $in: ids } });

    res.status(200).json(products);
  } catch (err) {
    console.error("Error in /products/by-ids:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE: Delete a product by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "❌ Product not found for deletion" });
    }

    console.log(`🗑️ Product "${deleted.productname}" deleted.`);
    res.status(200).json({ message: "✅ Product deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting product:", error.message);
    res.status(500).json({ message: "❌ Server error while deleting product", error: error.message });
  }
});

// PUT: Update a product by ID
router.put("/:id", upload.single("img"), async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    const { sellername, email, productname, description, category, price } = req.body;

    const updateData = {
      sellername,
      email,
      productname,
      description,
      category,
      price,
    };

    if (req.file) {
      updateData.img = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const updated = await Product.findByIdAndUpdate(id, updateData, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "❌ Product not found for update" });
    }

    console.log(`📝 Product "${updated.productname}" updated.`);
    res.status(200).json({ message: "✅ Product updated successfully" });
  } catch (error) {
    console.error("❌ Error updating product:", error.message);
    res.status(500).json({ message: "❌ Server error while updating product", error: error.message });
  }
});

module.exports = router;
