const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const DesignSubmit = require("../Models/designSubmitModel");
const Product = require("../Models/productModel");
const Designer = require("../models/designerModel");
const UserRequirement = require("../Models/user_requirementModel");
const User = require("../Models/userModel");
const Seller = require("../Models/sellerModel");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/submit-design", upload.single("img1"), async (req, res) => {
  try {
    const { email, design_name, description, category, price } = req.body;
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
