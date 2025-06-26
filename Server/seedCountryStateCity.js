const dotenv = require("dotenv");
const { dbConnect } = require("./config/db");
const Country = require("./models/Country");
const State = require("./models/State");
const City = require("./models/City");
const data = require("./extended_countries_states_cities.json");

dotenv.config();

const seedData = async () => {
  try {
    await dbConnect();

    await Country.deleteMany();
    await State.deleteMany();
    await City.deleteMany();

    for (const country of data) {
      const newCountry = new Country({ name: country.name });
      const savedCountry = await newCountry.save();

      for (const state of country.states) {
        const newState = new State({
          name: state.name,
          countryId: savedCountry._id,
        });
        const savedState = await newState.save();

        for (const city of state.cities) {
          const newCity = new City({
            name: city,
            stateId: savedState._id,
          });
          await newCity.save();
        }
      }
    }

    console.log("Countries, States, and Cities seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  }
};

seedData();