const express = require("express");
const {addItem, listItem, deleteItem}= require("../controllers/itemController");
const  multer = require("multer");



const itemRoute = express.Router();

//image storage
const storage = multer.diskStorage({
    destination : "uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})
itemRoute.post("/add",upload.single("image"),addItem);
itemRoute.get('/list', listItem);
itemRoute.post('/delete', deleteItem)


module.exports = itemRoute