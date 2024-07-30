import City from "../models/city/City.js";
import CityModel from "../models/city/City.model.js";

export class CityService {
  async getAllCities() {
    try {
      const cities = await City.find();
      return cities;
    } catch (error) {
      console.error("Error fetching all cities:", error);
      throw new Error("Failed to fetch cities");
    }
  }

  async searchCities(query: string) {
    try {
      const regex = new RegExp(query, "i"); 
      const cities = await City.find({ name: regex });
      return cities;
    } catch (error) {
      console.error("Error searching cities:", error);
      throw new Error("Failed to search cities");
    }
  }

  async getCityDetails(cityId: string) {
    try {
      const cityDetails = await CityModel.findOne({cityId: cityId})
        .populate("CinemaHall")
        .populate("Movie");
      
      if (!cityDetails) {
        throw new Error("City details not found");
      }
      
      return cityDetails;
    } catch (error) {
      console.error(`Error fetching city details:`, error);
      throw new Error(`Failed to fetch city details `);
    }
  }
}
