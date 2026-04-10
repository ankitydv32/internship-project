const Order = require("../models/Order");
const Cart = require("../models/cart");
const Artwork = require("../models/artwork");

exports.placeOrder = async (req, res) => {
  const { address } = req.body;

  const cartItems = await Cart.find({ userId: req.user.id }).populate("artworkId");

  const total = cartItems.reduce((sum, item) => {
    return sum + item.artworkId.price;
  }, 0);

  const order = await Order.create({
    userId: req.user.id,
    items: cartItems,
    total,
    address
  });

  // mark artworks as sold
  for (let item of cartItems) {
    await Artwork.findByIdAndUpdate(item.artworkId._id, {
      isSold: true
    });
  }

  // clear cart
  await Cart.deleteMany({ userId: req.user.id });

  res.json({ message: "Order placed", order });
};