require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Failed:", err));

app.get("/api/data", (req, res) => {
  res.json({ message: "Hello from Express Backend!" });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Express Server Running on port ${PORT}`));
