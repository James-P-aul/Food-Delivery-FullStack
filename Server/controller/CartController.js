import UserModel from "../model/UserModel.js";

export const addToCart = async (req, res) => {
  const userId = req.body.userId;
  const getUser = await UserModel.findById(userId);

  if (!getUser) {
    return res.json({ success: false, message: "Invalid credentials" });
  }

  const cartItems = await getUser.cartItems;
  const foodId = req.body.id;

  if (!cartItems[foodId]) {
    cartItems[foodId] = 1;
  } else {
    cartItems[foodId] += 1;
  }

  await UserModel.findByIdAndUpdate(userId, { cartItems });

  res.json({ success: true, message: "Item added" });
};

export const removeFromCart = async (req, res) => {
  const userId = req.body.userId;
  const getUser = await UserModel.findById(userId);

  if (!getUser) {
    return res.json({ success: false, message: "Invalid credentials" });
  }

  const cartItems = await getUser.cartItems;
  const foodId = req.body.id;

  if (cartItems[foodId] > 0) {
    cartItems[foodId] -= 1;
  }

  await UserModel.findByIdAndUpdate(userId, { cartItems });

  res.json({ success: true, message: "Food removed to Cart" });
};

export const getCartItems = async (req, res) => {
  const userId = req.body.userId;
  const getUser = await UserModel.findById(userId);

  if (!getUser) {
    return res.json({ success: false, message: "Invalid credentials" });
  }

  const cartItems = await getUser.cartItems;
  // console.log(cartItems);

  res.json({ success: true, data: cartItems });
};
