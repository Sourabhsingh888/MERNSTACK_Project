const express = require("express");
const router = express.Router();
const {
  getCountries,
  getStatesByCountry,
  getCitiesByState,
} = require("../controller/locationController");

// check countries / states/ cities
router.get("/countries", getCountries);
router.get("/states/:countryId", getStatesByCountry);
router.get("/cities/:stateId", getCitiesByState);

module.exports = router;