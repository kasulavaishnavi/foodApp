const Details = require("../models/userDetails");

//Get data
const getDetails = async(req,res)=>{
    try{
const userData  = await Details.find().sort({ createdAt: -1 });
res.status(200).json(userData);
    }catch(err){
        res.status(400).json({Error: err.message});
    }
}

//Post details
const postDetails = async(req,res)=>{
   
    const {orderType, name, number, street, city, state, zipCode, country, table} = req.body;
     try{
        const newinfo = new Details({orderType, name, number, street, city, state, zipCode, country, table});
        const userData = await newinfo.save();
res.status(200).json(userData);
    }catch(err){
        res.status(400).json({Error : err.message});
    }
}


module.exports = { 
    getDetails,
    postDetails,

}