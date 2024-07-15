import express from "express";
import FoodModel from "../model/FoodModel.js";
import FS from "fs";

const app = express();

//add new food item
export const addFood = async (req, res) => {
  // console.log(req.file);
  console.log(req);
  const image_filename = req.file.filename;
  const FoodData = new FoodModel({
    name: req.body.name,
    desc: req.body.desc,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await FoodData.save();
    res.json({ success: "true", data: FoodData, message: "Data saved" });
  } catch (error) {
    console.log(error);
    res.json({ success: "False", error: error, message: "Error Occured" });
  }
};

//get all food items
export const getAllItems = async (req, res) => {
  try {
    const data = await FoodModel.find({});
    // const resData = { count: data.length, data };
    res.json({ success: "true", data: data });
  } catch (error) {
    console.log(error);
    res.json({ success: "false", error: error });
  }
};

//get items based on category
export const getItems = async (req, res) => {
  const category = req.params.category;
  try {
    const data = await FoodModel.find({ category: category });
    const resData = { count: data.length, data };
    res.json({ success: "true", data: resData });
  } catch (error) {
    console.log(error);
    res.json({ success: "false", error: error });
  }
};

//delete a food item using its _id
export const deleteItem = async (req, res) => {
  // console.log(req.params);
  const id = req.params.id;
  try {
    const data = await FoodModel.findById(id);
    FS.unlink(`uploads/${data.image}`, () => {});
    await FoodModel.findByIdAndDelete(id);
    res.json({ success: "true", status: "deleted" });
  } catch (error) {
    console.log(error);
    res.json({ success: "false", status: error });
  }
};
