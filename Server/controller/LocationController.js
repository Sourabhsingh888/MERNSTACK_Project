const Country = require("../models/Country");
const State = require("../models/State");
const City = require("../models/City");

exports.getCountries = async (req, res) => {
  try {
    const countries = await Country.find({});
    res.json(countries);
  } catch (err) {
    res.status(500).json({ error: "Error fetching countries" });
  }
};

exports.getStatesByCountry = async (req, res) => {
  try {
    const states = await State.find({ countryId: req.params.countryId });
    res.json(states);
  } catch (err) {
    res.status(500).json({ error: "Error fetching states" });
  }
};

exports.getCitiesByState = async (req, res) => {
  try {
    const cities = await City.find({ stateId: req.params.stateId });
    res.json(cities);
  } catch (err) {
    res.status(500).json({ error: "Error fetching cities" });
  }
};
