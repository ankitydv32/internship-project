const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, "secretkey");

    const user = await User.findById(decoded.id);

    req.user = user; 
    next();
  } catch (err) {
    res.json({ message: "Invalid token" });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.json({ message: "Access denied. Admin only" });
  }
  next();
};