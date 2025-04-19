const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const DesignSubmit = require("../Models/designSubmitModel");
const Product = require("../Models/productModel");
const Designer = require("../models/designerModel");
const UserRequirement = require("../Models/user_requirementModel");
const User = require("../Models/userModel");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/submit-design", upload.single("img1"), async (req, res) => {
  try {
    const { email, design_name, description, category, price } = req.body;
    let { productIds } = req.body;

    console.log("Received productIds:", productIds);

    // Properly parse productIds
    let productIdArray = [];
    if (typeof productIds === "string") {
      productIdArray = productIds.split(","); // Convert string '1,2,3,4' into [1,2,3,4]
    } else if (Array.isArray(productIds)) {
      productIdArray = productIds; // Already an array, no change needed
    }

    const designer = await Designer.findOne({ email });

    if (!designer) {
      return res.status(400).json({ message: "Unregistered designer" });
    }

    const newDesign = new DesignSubmit({
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

router.post("/submit-product", upload.single("img"), async (req, res) => {
  try {
    const { email, description, productname, category, price } = req.body;

    const lastProduct = await Product.findOne().sort({ productid: -1 }).exec();
    const newProductId = lastProduct ? lastProduct.productid + 1 : 1;

    const newProduct = new Product({
      productid: newProductId, // <-- no need toString now
      email,
      description,
      img: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      productname,
      category,
      price,
    });

    await newProduct.save();
    res
      .status(201)
      .json({
        message: "Product submitted successfully!",
        productid: newProductId,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/user-requirement", upload.single("img"), async (req, res) => {
  try {
    const { username, email, title, desc, price } = req.body;

    const newRequirement = new UserRequirement({
      username,
      email,
      title,
      img: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      desc,
      price,
    });

    await newRequirement.save();
    res
      .status(201)
      .json({ message: "User Requirement submitted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/preferences", async (req, res) => {
  console.log("Incoming request:", req.body);

  const { email, preferences } = req.body;

  if (!email || !preferences || !Array.isArray(preferences)) {
    console.log("Invalid input");
    return res.status(400).json({ message: "Invalid data" });
  }

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { designPreferences: preferences },
      { new: true }
    );

    if (!user) {
      console.log("User not found for email:", email);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Preferences updated for:", user.email);
    return res.status(200).json({ message: "Preferences saved", user });
  } catch (err) {
    console.error("💥 Error while updating preferences:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
