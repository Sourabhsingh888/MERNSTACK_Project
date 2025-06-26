const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  profilePhoto: String,
  username: { type: String, required: true, unique: true },
  gender: {type: String, required: true},
  password: String,
  profession: String,
  companyName: String,
  addressLine1: { type: String, required: true },
  country: String,
  state: String,
  city: String,
  subscriptionPlan: String,
  newsletter: { type: Boolean, default: true },
  dob: { type: Date, required: true,},
});

module.exports = mongoose.model("User", userSchema);
