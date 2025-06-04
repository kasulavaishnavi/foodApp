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
const itemRoute = require("./routes/itemRoute");
const cartRouter = require("./routes/cartRoutes")
// Routes
app.use("/api/food", userDetails);
app.use("/api/food", itemRoute)
app.use("/images", express.static('uploads'));
app.use("/api/food", cartRouter)





app.listen(port, () => {
  console.log(`Server is running at PORT: ${port}`);
});