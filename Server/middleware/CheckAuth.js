import jwt from "jsonwebtoken";

const CheckAuth = (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    return res.json({ success: false, message: "Please login again" });
  }
  const id = jwt.verify(token, process.env.JWT_SECRET);
  if (!id) {
    return res.json({ success: false, message: "Invalid again" });
  }

  req.body.userId = id.id;
  next();
};

export default CheckAuth;
