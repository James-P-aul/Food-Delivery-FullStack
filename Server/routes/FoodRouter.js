import express from "express";
import {
  addFood,
  deleteItem,
  getAllItems,
  getItems,
} from "../controller/FoodController.js";
import multer from "multer";

const FoodRouter = express.Router();

//multer image engine
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

//routes- /api/food/..
FoodRouter.post("/add", upload.single("image"), addFood);
FoodRouter.get("/list", getAllItems);
FoodRouter.get("/list/:category", getItems);
FoodRouter.delete("/:id", deleteItem);

export default FoodRouter;
