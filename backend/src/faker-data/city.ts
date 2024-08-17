import { Sequelize } from "sequelize";
import { City } from "../PGmodels/City/City.js";
import logger from "../logger/logger.js";

const seedCities = async (): Promise<void> => {
  const cities: { name: string; state: string }[] = [
    { name: "Mumbai", state: "Maharashtra" },
    { name: "Delhi", state: "Delhi" },
    { name: "Bengaluru", state: "Karnataka" },
    { name: "Hyderabad", state: "Telangana" },
    { name: "Ahmedabad", state: "Gujarat" },
    { name: "Chennai", state: "Tamil Nadu" },
    { name: "Kolkata", state: "West Bengal" },
    { name: "Surat", state: "Gujarat" },
    { name: "Pune", state: "Maharashtra" },
    { name: "Jaipur", state: "Rajasthan" },
  ];

  try {
    for (const city of cities) {
      await City.create(city);
    }
    console.log("Database seeded with cities!");
  } catch (err) {
    logger.log(err);
    console.error("Error seeding cities:", err.message);
    process.exit(1);
  }
};

export default seedCities;
