const mongoose = require("mongoose");

const userRequirementModel = new mongoose.Schema({

    username:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    title:{
        type:String,
        required:true
    },

    img:{
        data:Buffer,
        contentType:String
    },

    desc:{
        type:String,
        required:true
    },

    price:{
        type:String,
        required:true
    }
})

const UserRequirement = mongoose.model("UserRequirement",userRequirementModel);

module.exports = UserRequirement;