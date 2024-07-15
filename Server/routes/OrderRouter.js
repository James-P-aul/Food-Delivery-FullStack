import express from "express";
import CheckAuth from "../middleware/CheckAuth.js";
import {
  listOrders,
  placeOrder,
  userOrders,
  verifyOrder,
} from "../controller/OrderController.js";

const OrderRouter = express.Router();

OrderRouter.post("/place", CheckAuth, placeOrder);
OrderRouter.post("/verify", verifyOrder);
OrderRouter.post("/userorders", CheckAuth, userOrders);
OrderRouter.get("/list", listOrders);

export default OrderRouter;
