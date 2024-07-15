import UserModel from "../model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  //check if email exists
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.json({ success: false, message: "No such user" });
  }

  const passCorrect = bcrypt.compareSync(password, user.password);
  if (!passCorrect) {
    return res.json({ success: false, message: "Invalid Credentials" });
  }

  const token = createToken(user._id);
  res.json({ success: true, token: token });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  //check if email already exists
  const exist = await UserModel.findOne({ email });
  if (exist) {
    return res.json({ success: false, message: "User already exists" });
  }

  //check email is correct
  if (!validator.isEmail(email)) {
    return res.json({ success: false, message: "Enter a valid email" });
  }

  //check password is strong enough
  if (password.length < 8) {
    return res.json({ success: false, message: "Enter a strong passowrd" });
  }

  const salt = 10;
  const hashedPass = bcrypt.hashSync(password, salt);

  const user = new UserModel({
    name: name,
    email: email,
    password: hashedPass,
  });

  const savedUser = await user.save();

  const token = createToken(savedUser._id);

  res.json({ success: true, token: token });
};
