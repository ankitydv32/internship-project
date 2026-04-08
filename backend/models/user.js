const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String
  },

  email: {
    type: String,
    unique: true
  },

  password: {
    type: String
  },

  role: {
    type: String,
    enum: ["user", "admin"],   
    default: "user"
  },

  isEmailVerified: {
    type: Boolean,
    default: false
  },

  isActive: {             
    type: Boolean,
    default: true
  }

}, { timestamps: true });  

module.exports = mongoose.model("User", userSchema);