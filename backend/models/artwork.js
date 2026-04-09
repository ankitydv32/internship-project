const mongoose = require("mongoose");

const artworkSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  artist: String,
  image: String,
  isSold: {
    type: Boolean,
    default: false
  },
  isHidden: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model("Artwork", artworkSchema);