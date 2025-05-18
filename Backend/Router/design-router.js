const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../Models/productModel");
const DesignSubmit = require("../Models/designSubmitModel");
const multer = require("multer");
const Designer = require("../Models/designerModel");


// Multer config
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single("img"), async (req, res) => {
  try {
    const { designer_name,email, design_name, description, category, price } = req.body;
    let { designProducts } = req.body;

    console.log("Incoming request body:", req.body); // Log the entire request body
    console.log("Received email:", email);

    console.log("Received productIds:", designProducts);

    // Properly parse productIds
    let productIdArray = [];
    if (typeof designProducts === "string") {
      productIdArray = designProducts.replace(/[{}]/g, "").split(",");
    }
     else if (Array.isArray(designProducts)) {
      productIdArray = designProducts; // Already an array, no change needed
    }

    const normalizedEmail = email.trim().toLowerCase();
    const designer = await Designer.findOne({ email: normalizedEmail });
    
    if (!designer) {
      return res.status(400).json({ message: "Unregistered designer" });
    }

    const newDesign = new DesignSubmit({
    designer_name,  
      email,
      design_name,
      description,
      img1: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      category,
      price,
      designProducts: productIdArray,
    });

    await newDesign.save();
    res.status(201).json({ message: "Design submitted successfully!" });
  } catch (error) {
    console.error(error); // Always good to log error
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const designs = await DesignSubmit.find();

    const formattedDesigns = designs.map((product) => {
      let base64Image = null;

      if (product.img?.data) {
        const buffer = product.img.data;
        const mimeType = product.img.contentType;
        base64Image = `data:${mimeType};base64,${buffer.toString("base64")}`;
      }

      return {
        _id: product._id,
        designer_name: product.designer_name,
        email: product.email,
        design_name: product.design_name, // ✅ Fix here
        description: product.description,
        category: product.category,
        price: product.price,
        img: base64Image,
      };
    });

    res.status(200).json(formattedDesigns);
  } catch (error) {
    console.error("❌ Error fetching design:", error);
    res.status(500).json({ message: "Server error while fetching products", error });
  }
});


module.exports = router;

