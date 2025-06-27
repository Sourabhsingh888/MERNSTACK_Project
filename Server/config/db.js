const mongoose = require("mongoose");
require("dotenv").config();
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.mongodb_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("DB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", err.message);
  }
};
module.exports = { dbConnect };
