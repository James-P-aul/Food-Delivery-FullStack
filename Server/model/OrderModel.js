import mongoose, { Mongoose } from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: "Food processing" },
  data: { type: Date, default: Date.now() },
  payment: { type: Boolean, default: false },
});

const OrderModel = mongoose.model("order", orderSchema);

export default OrderModel;
