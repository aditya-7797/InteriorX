const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const DesignSubmit = require("../Models/designSubmitModel");
const multer = require("multer");
const Designer = require("../Models/designerModel");

// Multer config
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single("img"), async (req, res) => {
  try {
    const { designer_name, email, design_name, description, category, price } =
      req.body;
    let { designProducts } = req.body;

    // Check if req.file exists
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required." });
    }

    // Parse designProducts properly
    let productIdArray = [];
    // Backend
    if (typeof designProducts === "string") {
      productIdArray = JSON.parse(designProducts);
    } else if (Array.isArray(designProducts)) {
      productIdArray = designProducts;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const designer = await Designer.findOne({ email: normalizedEmail });
    if (!designer) {
      return res.status(400).json({ message: "Unregistered designer" });
    }

    const lastDesign = await DesignSubmit.findOne()
      .sort({ designid: -1 })
      .exec();
    const newDesignId = lastDesign ? lastDesign.designid + 1 : 1;

    const newDesign = new DesignSubmit({
      designid: newDesignId,
      designer_name,
      email,
      design_name,
      description,
      img: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      category,
      price,
      designProducts: productIdArray,
    });

    await newDesign.save();
    res
      .status(201)
      .json({
        message: "Design submitted successfully!",
        design_id: newDesignId,
      });
  } catch (error) {
    console.error("❌ Error in /designs POST:", error); // <-- Make sure you see this on server console
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const designs = await DesignSubmit.find();

    const formattedDesigns = designs.map((design) => {
      let base64Image = null;

      if (design.img?.data && design.img?.contentType) {
        let buffer;

        if (Buffer.isBuffer(design.img.data)) {
          buffer = design.img.data;
        } else if (design.img.data?.data) {
          buffer = Buffer.from(design.img.data.data); // Mongoose Binary
        } else {
          buffer = Buffer.from([]); // fallback
        }

        base64Image = `data:${design.img.contentType};base64,${buffer.toString(
          "base64"
        )}`;
      }

      return {
        _id: design._id,
        designid: design.designid, // ✅ match schema field name
        designer_name: design.designer_name,
        email: design.email,
        design_name: design.design_name,
        description: design.description,
        category: design.category,
        price: design.price,
        designProducts: design.designProducts,
        img: base64Image,
      };
    });

    res.status(200).json(formattedDesigns);
  } catch (error) {
    console.error("❌ Error fetching designs:", error);
    res.status(500).json({
      message: "Server error while fetching designs",
      error: error.message,
    });
  }
});


module.exports = router;
