const express= require("express");

const {listOrders, createOrder} = require("../controllers/cartController/cartController")

const cartRouter = express.Router();
cartRouter.post("/orders/create", createOrder);
cartRouter.get("/orders", listOrders)

module.exports = cartRouter;