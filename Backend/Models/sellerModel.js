const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true }); // ✅ Adds createdAt & updatedAt automatically

// ✅ Correctly define and export the model
const Seller = mongoose.model("Seller", sellerSchema);
module.exports = Seller;
