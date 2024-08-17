import { Op } from "sequelize";
import { City } from "../PGmodels/City/City.js";
// import { CinemaHall } from "../PGmodels/CinemaHall/Cinemahall.js";
// import { Movie } from "../PGmodels/Movie/Movie.js";

export class CityService {
  async getAllCities() {
    try {
      const cities = await City.findAll();
      return cities;
    } catch (error) {
      console.error("Error fetching all cities:", error);
      throw new Error("Failed to fetch cities");
    }
  }

  async searchCities(query: string) {
    try {
      const cities = await City.findAll({
        where: {
          name: {
            [Op.iLike]: `%${query}%`
          }
        }
      });
      return cities;
    } catch (error) {
      console.error("Error searching cities:", error);
      throw new Error("Failed to search cities");
    }
  }

}
