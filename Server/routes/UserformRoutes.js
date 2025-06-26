const express = require("express");
const router = express.Router();
const { upload } = require("../config/multer");
const {
  checkUsername,
  submitForm,
  updatePassword,
} = require("../controller/UserformController");

// check countries / states/ cities

// Check Username
router.get("/check-username", checkUsername);

// Submit User Form
router.post("/submit-user", upload.single("profilePhoto"), submitForm);

// updated password route 
router.post("/update-password", updatePassword);

module.exports = router;
