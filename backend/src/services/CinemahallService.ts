import CinemaHall from "../models/cinema_hall/CinemaHall.js";
import CityModel from "../models/city/City.model.js";

export class CinemaHallService {
    
  async getCinemaHallsByCityId(cityId: string) {
    try {
      const city = await CityModel.findOne({cityId: cityId}).populate('CinemaHall');
      if (!city) {
        throw new Error("City not found");
      }
      const cinemaHalls = city.cinemaHalls;
      return cinemaHalls;
    } catch (error) {
      console.error(`Error fetching cinema halls for city ${cityId}:`, error);
      throw new Error(`Failed to fetch cinema halls for city ${cityId}`);
    }
  }

  async getCinemaHallsByCityIdAndMovieId(cityId: string, movieId: string) {
    try {
      const cinemaHalls = await CinemaHall.find({
        "city_id": cityId,
        "movies": movieId
      });
      
      if (!cinemaHalls.length) {
        throw new Error("No cinema halls found for this movie in the specified city");
      }
      
      return cinemaHalls;
    } catch (error) {
      console.error(`Error fetching cinema halls for movie ${movieId} in city ${cityId}:`, error);
      throw new Error(`Failed to fetch cinema halls for movie ${movieId} in city ${cityId}`);
    }
  }
  async getCinemaHallsByOperatorId(operatorId: string) {
    try {
      const cinemaHalls = await CinemaHall.find({ operator_id: operatorId }).select("name movies");

      if (!cinemaHalls.length) {
        throw new Error("No cinema halls found for the specified operator");
      }

      return cinemaHalls;
    } catch (error) {
      console.error(`Error fetching cinema halls for operator ${operatorId}:`, error);
      throw new Error(`Failed to fetch cinema halls for operator ${operatorId}`);
    }
  }
}
