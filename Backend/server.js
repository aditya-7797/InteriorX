require("dotenv").config(); // Load environment variables FIRST

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const router = require("./Router/auth-router");
const router2 = require("./Router/submission-route");
const productRouter = require("./Router/product-router"); // Import product router
const designRouter = require("./Router/design-router"); // Import design router


const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE,HEAD,PATCH",
  credentials: true,
};

// ✅ Configure CORS properly
app.use(cors(corsOptions)); // Allow all origins (Customize for security)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/auth",router);
app.use("/sub",router2);
app.use("/products", productRouter); // Product-related routes
app.use("/designs", designRouter); // Design-related routes


// ✅ Check if MONGO_URI exists
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("❌ MONGO_URI is missing in .env file!");
  process.exit(1); // Stop server if no database URL is found
}

// ✅ Connect to MongoDB
mongoose.connect(mongoUri)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => {
    console.error("❌ MongoDB Connection Failed:", err);
    process.exit(1); // Stop server on DB connection failure
  });


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Express Server Running on port ${PORT}`));

