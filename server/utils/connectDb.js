const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connect database successfully!");
  } catch (error) {
    console.log(error);
    console.log("Connect database fail!");
  }
};

module.exports = { connectDb };
