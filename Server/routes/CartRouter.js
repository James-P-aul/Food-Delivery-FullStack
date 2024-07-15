import express from "express";
import CheckAuth from "../middleware/CheckAuth.js";
import {
  addToCart,
  getCartItems,
  removeFromCart,
} from "../controller/CartController.js";

const cartRouter = express.Router();

cartRouter.post("/add", CheckAuth, addToCart);
cartRouter.post("/remove", CheckAuth, removeFromCart);
cartRouter.get("/get", CheckAuth, getCartItems);

export default cartRouter;
