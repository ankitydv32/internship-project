const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: String,

  name: String,
  email: String,
  address: String,

  items: [
    {
      artworkId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artwork"
      },
      title: String
    }
  ],

  total: Number,

  paymentStatus: {
    type: String,
    default: "Success"
  },

  deliveryStatus: {
    type: String,
    default: "Processing"
  }

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);