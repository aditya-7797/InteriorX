const mongoose = require("mongoose");

const designSumbitSchema = new mongoose.Schema({
    
    email: {
        type: String,
        required: true
    },

    img1: { 
        data: Buffer, 
        contentType: String 
    }, 
    
    design_name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    category:{
        type: String,
        required: true
    },

    price: {
        type: String,
        required: true
    },

    designProducts: {
        type: [String],
        default: [],
    },
},{ timestamps: true });

const DesignSubmit = mongoose.model("DesignSubmit",designSumbitSchema);

module.exports = DesignSubmit;