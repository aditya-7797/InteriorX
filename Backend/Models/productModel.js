const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

  username:{
    type:String,
    required:true
  },

  productname: {
    type:String,
    required:true
  },

  email: {
    type: String,
    required: true
},

img: { 
    data: Buffer, 
    contentType: String 
}, 

description: {
    type: String,
    required: true
},

category:{
    type:String,
    required: true
},

price: {
    type:String,
    required: true
}

});

const Product = mongoose.model("Product",productSchema);
module.exports= Product;