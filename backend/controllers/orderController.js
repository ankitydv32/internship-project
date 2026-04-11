const Order = require("../models/Order");
const Cart = require("../models/cart");
const Artwork = require("../models/artwork");

exports.placeOrder = async (req, res) => {
  try {
    const { name, email, address } = req.body;

    const cartItems = await Cart.find({ userId: req.user.id })
  .populate("artworkId", "title price image");

    const total = cartItems.reduce((sum, item) => {
      return sum + (item.artworkId?.price || 0);
    }, 0);

     const order = await Order.create({
       userId: req.user.id,
         items: cartItems.map(item => ({
      artworkId: item.artworkId._id,
         title: item.artworkId.title   
           })),
           total,
          address,
          name: req.body.name,
           email: req.body.email
          });

    // mark artworks as sold
    for (let item of cartItems) {
      await Artwork.findByIdAndUpdate(item.artworkId._id, {
        isSold: true
      });
    }

    await Cart.deleteMany({ userId: req.user.id });

    res.json({ message: "Order placed", order });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error placing order" });
  }
};