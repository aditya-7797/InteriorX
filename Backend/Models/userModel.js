const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
const User = mongoose.model("User", userSchema);
module.exports = User;
