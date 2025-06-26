const User = require("../models/Userforms");
const { hashPassword, comparePassword } = require("../utils/utilsbcrypt");


exports.checkUsername = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.query.username });
    res.json({ available: !user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Plain-text password update (for initial testing only!)
// exports.updatePassword = async (req, res) => {
//     const { username, currentPassword, newPassword } = req.body;
  
//     try {
//       const user = await User.findOne({ username });
  
//       if (!user) {
//         return res.status(404).json({ error: "User not found" });
//       }
  
//       // Step 1: Check if current password matches
//       if (user.password !== currentPassword) {
//         return res.status(400).json({ error: "Current password is incorrect" });
//       }
  
//       // Step 2: Validate new password strength
//       const isStrong =
//         newPassword.length >= 8 &&
//         /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) &&
//         /\d/.test(newPassword);
  
//       if (!isStrong) {
//         return res.status(400).json({
//           error: "New password must be 8+ chars, with 1 special char and 1 number",
//         });
//       }
  
//       // Step 3: Update password
//       user.password = newPassword;
//       await user.save();
  
//       res.json({ success: true, message: "Password updated successfully (plain text)" });
//     } catch (err) {
//       res.status(500).json({ error: "Server error", detail: err.message });
//     }
//   };

exports.updatePassword = async (req, res) => {
  const { username, currentPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await comparePassword(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    // Optional: validate password strength (8+ chars, 1 special char, 1 number)
    const isStrong =
      newPassword.length >= 8 &&
      /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) &&
      /\d/.test(newPassword);
    if (!isStrong) {
      return res.status(400).json({
        error:
          "New password must be 8+ chars, with 1 special char and 1 number",
      });
    }

    user.password = await hashPassword(newPassword);
    await user.save();

    res.json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error", detail: err.message });
  }
};

exports.submitForm = async (req, res) => {
  try {
    const {
      username,
      gender,
      password,
      profession,
      companyName,
      addressLine1,
      country,
      state,
      city,
      subscriptionPlan,
      newsletter,
      dob,
    } = req.body;

    // Add this DOB validation here
    if (new Date(dob) > new Date()) {
      return res.status(400).json({ error: "DOB cannot be in the future" });
    }

    const hashedPwd = await hashPassword(password);
      
    const newUser = new User({
      profilePhoto: req.file?.filename,
      username,
      gender,
      password: hashedPwd,
      profession,
      companyName,
      addressLine1,
      country,
      state,
      city,
      subscriptionPlan,
      newsletter: newsletter === "true",
      dob,
    });

    await newUser.save();
    res.status(201).json({ success: true, message: "User saved successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error saving user", detail: err.message });
  }
};

