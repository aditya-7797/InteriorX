const mongoose = require("mongoose");

const designSumbitSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },

    email: {
        type: String,
        required: true
    },

    img1: { 
        data: Buffer, 
        contentType: String 
    }, 

    description: {
        type: String,
        required: true
    }
},{ timestamps: true });

const DesignSubmit = mongoose.model("DesignSubmit",designSumbitSchema);

module.exports = DesignSubmit;