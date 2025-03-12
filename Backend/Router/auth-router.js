const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Import dotenv

const User = require("../models/userModel");
const Seller = require("../models/sellerModel");
const Designer = require("../models/designerModel");


router.post("/signup/user", async (req, res) => {
    try {
        // ✅ Corrected "mobileno" → "phone"
        const { username, email, phone, password } = req.body;

        // ✅ Validate all required fields
        if (!username || !email || !phone || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        // ✅ Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "Email already registered" });
        }

        // ✅ Hash the password correctly
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Create a new user with correct fields
        const newUser = new User({ username, email, phone, password: hashedPassword });
        await newUser.save();

        // ✅ Generate JWT token securely
        const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "30d" }
        );

        res.status(201).json({
            msg: "User registered successfully",
            userId: newUser._id,
            token
        });

    } catch (error) {
        console.error("❌ Registration Error:", error);
        res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
});

router.post("/login/user",async (req,res) => {
    
    const {email,password} = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "All fields are required" });
    }

    try {
        const user = await User.findOne({email});

        
        if(!user){
            console.log("❌ User not found in database ,enter mail correctly");
            return res.status(400).json({ msg: "User not found" });
        }
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                console.log("❌ Invalid Credentials - Password mismatch");
                return res.status(400).json({ msg: "Invalid credentials" });
            }

            console.log("✅ Login Successful");

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

        return res.json({ token, user: { id: user._id, email: user.email } });


        }
    catch (error) {
        console.error("🔥 Server Error:", error);
        res.status(500).json({ msg: "Server error" });
    }
});

router.post("/signup/seller", async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;

        if (!username || !email || !phone || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const existingSeller = await Seller.findOne({ email });
        if (existingSeller) {
            return res.status(400).json({ msg: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Seller({ username, email, phone, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "30d" }
        );

        res.status(201).json({
            msg: "Seller registered successfully",
            userId: newUser._id,
            token
        });

    } catch (error) {
        console.error("❌ Registration Error:", error);
        res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
});

router.post("/login/seller",async (req,res) => {
    
    const {email,password} = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "All fields are required" });
    }

    try {
        const seller = await Seller.findOne({email});

        
        if(!seller){
            console.log("❌ User not found in database ,enter mail correctly");
            return res.status(400).json({ msg: "User not found" });
        }
            const isMatch = await bcrypt.compare(password, seller.password);

            if (!isMatch) {
                console.log("❌ Invalid Credentials - Password mismatch");
                return res.status(400).json({ msg: "Invalid credentials" });
            }

            console.log("✅ Login Successful");

            const token = jwt.sign({ id: seller._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

        return res.json({ token, seller: { id: seller._id, email: seller.email } });

        }
    catch (error) {
        console.error("🔥 Server Error:", error);
        res.status(500).json({ msg: "Server error" });
    }
});

router.post("/signup/designer", async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;

        if (!username || !email || !phone || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const existingDesigner = await User.findOne({ email });
        if (existingDesigner) {
            return res.status(400).json({ msg: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newDesigner = new Designer({ username, email, phone, password: hashedPassword });
        await newDesigner.save();

        // ✅ Generate JWT token securely
        const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "30d" }
        );

        res.status(201).json({
            msg: "Designer registered successfully",
            userId: newDesigner._id,
            token
        });

    } catch (error) {
        console.error("❌ Registration Error:", error);
        res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
});

router.post("/login/designer",async (req,res) => {
    
    const {email,password} = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "All fields are required" });
    }

    try {
        const designer = await Designer.findOne({email});

        if(!designer){
            console.log("❌ Designer not found in database ,enter mail correctly");
            return res.status(400).json({ msg: "Designer not found" });
        }
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                console.log("❌ Invalid Credentials - Password mismatch");
                return res.status(400).json({ msg: "Invalid credentials" });
            }

            console.log("✅ Login Successful");

            const token = jwt.sign({ id: designer._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

        return res.json({ token, user: { id: designer._id, email: designer.email } });
        }

        catch (error) {
        console.error("🔥 Server Error:", error);
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;
