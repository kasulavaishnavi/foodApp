const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");


dotenv.config();

const app = express();
app.use(cors());

// Middleware
app.use(express.json());

// Port
const port = process.env.PORT || 4000;

app.get("/",(req,res)=>{
    res.send("heeloo");
}) 

//Database connection
require("./DB/connection");


// Require Routes
const userDetails = require("./routes/userDetails");

// Routes
app.use("/api/food", userDetails);



app.listen(port, () => {
  console.log(`Server is running at PORT: ${port}`);
});