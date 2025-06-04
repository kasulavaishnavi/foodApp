const foodModal = require("../models/foodModal");
const fs = require("fs");



//add food item

const addItem = async(req,res)=>{

let image_filename = `${req.file.filename}`;
const item = new foodModal({
    name: req.body.name,
    price:req.body.price,
    category:req.body.category,
    image:image_filename
})
try{
await item.save();
res.json({success:true, message:"item added"})
}catch(error){
console.log(error)
res.json({success:false, message:"Error"})
}
}

//item list
const listItem = async(req,res)=>{
    try{
const items = await foodModal.find({});
res.json({success:true, data:items})
    }catch(error){
console.log(error);
res.json({success:false, message:"error"});
    }

}

//remove item

const deleteItem = async(req,res)=>{
    try{
const item = await foodModal.findById(req.body.id);
fs.unlink(`uploads/${item.image}`,()=>{})
await foodModal.findByIdAndDelete(req.body.id);
res.json({success:true, message:"item deleted"})
    }catch(error){
        console.log(error);
res.json({success:false, message:"Error"})

    }

}

module.exports = {addItem , listItem, deleteItem};