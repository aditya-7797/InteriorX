require("dotenv").config(); // Load environment variables FIRST

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const router = require("./Router/auth-router");


const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE,HEAD,PATCH",
  credentials: true,
};

// ✅ Configure CORS properly
app.use(cors(corsOptions)); // Allow all origins (Customize for security)
app.use(express.json());

app.use("/",router);


// ✅ Check if MONGO_URI exists
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("❌ MONGO_URI is missing in .env file!");
  process.exit(1); // Stop server if no database URL is found
}

// ✅ Connect to MongoDB
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => {
    console.error("❌ MongoDB Connection Failed:", err);
    process.exit(1); // Stop server on DB connection failure
  });

// ✅ Sample API route
app.get("/api/data", (req, res) => {
  res.json({ message: "Hello from Express Backend!" });
});

// ✅ Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Express Server Running on port ${PORT}`));
