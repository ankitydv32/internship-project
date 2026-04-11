const Order = require("../models/Order");

// Get all orders
exports.getAllOrders = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};

// Update delivery status
exports.updateStatus = async (req, res) => {
  const { status } = req.body;

  await Order.findByIdAndUpdate(req.params.id, {
    deliveryStatus: status
  });

  res.json({ message: "Status updated" });
};