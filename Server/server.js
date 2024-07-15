import express from "express";
import cors from "cors";
import FoodRouter from "./routes/FoodRouter.js";
import mongoose from "mongoose";
import UserRouter from "./routes/UserRouter.js";
import bodyParser from "body-parser";
import "dotenv/config";
import cartRouter from "./routes/CartRouter.js";
import OrderRouter from "./routes/OrderRouter.js";

const app = express();
await mongoose
  .connect(
    "mongodb+srv://joyjoypaul1:gUPEoHY4XZJ6M89T@cluster0.xx1fbgc.mongodb.net/FoodDel"
  )
  .then(() => {
    console.log("Connected to DB");
  });

//middlewares
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(cors());

//end-points
app.use("/api/food", FoodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", UserRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", OrderRouter);

app.get("/", (req, res) => {
  res.send("Hello from API");
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("listening at port 8000");
});

process.on("exit", function () {
  mongoose.disconnect();
});
// mongoose.connection.close();
