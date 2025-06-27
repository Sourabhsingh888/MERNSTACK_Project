const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8080;
const { dbConnect } = require("./config/db");
const userformRoutes = require("./routes/UserformRoutes");
const locationsRoutes = require("./routes/LocationsRoutes")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the uploads/images folder
app.use("/", express.static("./uploads"));

// API routes
app.use("/api/users", userformRoutes);
app.use("/api/location", locationsRoutes);

// Connect to the database
dbConnect();

// Start the server
app.listen(PORT, () => {
  console.log(`The server is running at ${PORT}`);
});
