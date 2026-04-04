const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://admin:ankit123@ac-goenc9u-shard-00-00.aypl8dk.mongodb.net:27017,ac-goenc9u-shard-00-01.aypl8dk.mongodb.net:27017,ac-goenc9u-shard-00-02.aypl8dk.mongodb.net:27017/mydb?ssl=true&replicaSet=atlas-18p1kt-shard-0&authSource=admin&retryWrites=true&w=majority");
    
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;