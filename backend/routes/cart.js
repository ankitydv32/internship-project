const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  removeFromCart
} = require("../controllers/cartController");

const { verifyToken } = require("../middleware/authMiddleware");
const Cart = require("../models/cart");

router.post("/add", verifyToken, addToCart);
router.get("/", verifyToken, getCart);


router.delete("/clear", verifyToken, async (req, res) => {
  await Cart.deleteMany({ userId: req.user.id });
  res.json({ message: "Cart cleared" });
});
router.delete("/:id", verifyToken, removeFromCart);

module.exports = router;