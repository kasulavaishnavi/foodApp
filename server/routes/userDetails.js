const express = require("express");

const Details = require("../models/userDetails")



const router = express.Router();


//Require Controller
const { getDetails,postDetails}=  require("../controllers/userDetails")


//GET Group Data
router.get("/", getDetails);
router.post("/",postDetails);


module.exports = router;