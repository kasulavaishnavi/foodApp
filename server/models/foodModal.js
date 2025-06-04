const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: {
        type : String,
        required:true
    },
    price :{
        type: Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    }
})

const itemDetails = mongoose.models.itemDetails || mongoose.model("itemDetails",itemSchema);

module.exports = itemDetails;