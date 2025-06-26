const mongoose = require("mongoose");
require("dotenv").config();
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.mongodb_url);
    console.log("DB connected successfully");
  } catch (error) {
    console.error(error);
  }
};
module.exports = { dbConnect };
