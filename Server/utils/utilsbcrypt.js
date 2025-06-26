const bcrypt = require("bcrypt");

// Function to hash the password
const hashPassword = async (password) => {
  if (!password) {
    throw new Error("Password is required");
  }

  // Generate a salt and hash the password with it
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt); // Hash password with the generated salt
};

// Function to compare an input password with the stored hashed password
const comparePassword = async (inputPassword, hashedPassword) => {
  if (!inputPassword || !hashedPassword) {
    throw new Error("Both input password and hashed password are required");
  }
  return bcrypt.compare(inputPassword, hashedPassword);
};

module.exports = {
  hashPassword,
  comparePassword,
};
