const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: String,
  artworkId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Artwork"
 },
  quantity: {
    type: Number,
    default: 1
  }
});

module.exports = mongoose.model("Cart", cartSchema);