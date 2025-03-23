const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const DesignSubmit = require("../Models/designSubmitModel"); 
const Product = require("../Models/productModel"); 
const Designer = require("../models/designerModel");
const UserRequirement = require("../Models/user_requirementModel")

const router = express.Router();

const storage = multer.memoryStorage(); // Store file in memory as Buffer
const upload = multer({ storage: storage });

router.post("/submit-design", upload.single("img1"), async (req, res) => {
    try {
        const { username, email, description } = req.body;

        const designer = Designer.findOne("email");

        if(!designer){
            alert("Not registered as designer");
            res.status(400).json({message:"unregistered designer"})
        }

        const newDesign = new DesignSubmit({
            username,
            email,
            description,
            img1: {
                data: req.file.buffer, // Save file buffer
                contentType: req.file.mimetype, // Save file type
            },
        });

        await newDesign.save();
        res.status(201).json({ message: "Design submitted successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/submit-product", upload.single("img"), async (req, res) => {
    try {
        const { username, email, description, productname,category,price } = req.body;

        const product = Product.findOne("email");

        if(!product){
            alert("Not registered as designer");
            res.status(400).json({message:"unregistered designer"})
        }

        const newProduct = new Product({
            username,
            email,
            description,
            img1: {
                data: req.file.buffer, // Save file buffer
                contentType: req.file.mimetype, // Save file type
            },
            productname,
            category,
            price
        });

        await newProduct.save();
        res.status(201).json({ message: "Product submitted successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/user-requirement",upload.single("img"),async(req,res)=>{
    
    try {
        
        const {username,email,title,desc,price} = req.body;

        const newRequirement = new UserRequirement({
            username,
            email,
            title,
            img: {
                data: req.file.buffer,
                contentType: req.file.mimetype,
            },
            desc,
            price
        });

        await newRequirement.save();
        res.status(201).json({ message: "User Requirement submitted successfully!" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
