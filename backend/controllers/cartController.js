const Cart = require("../models/cart");

// Add to cart
exports.addToCart = async (req, res) => {
  try {
    const { artworkId } = req.body;

    const existing = await Cart.findOne({
      userId: req.user.id,
      artworkId
    });

    if (existing) {
      return res.json({ message: "Already in cart" });
    }

    const item = new Cart({
      userId: req.user.id,
      artworkId
    });

    await item.save();
    res.json(item);

  } catch (err) {
    res.status(500).json({ message: "Error adding to cart" });
  }
};

// Get cart
exports.getCart = async (req, res) => {
  try {
    const items = await Cart.find({ userId: req.user.id })
      .populate("artworkId");

    res.json(items);

  } catch (err) {
    res.status(500).json({ message: "Error fetching cart" });
  }
};


exports.removeFromCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Removed" });

  } catch (err) {
    res.status(500).json({ message: "Error removing item" });
  }
};