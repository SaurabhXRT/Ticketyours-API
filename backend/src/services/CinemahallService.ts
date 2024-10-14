import { CinemaHallImage } from "../PGmodels/CinemaHall/CinemaHallImage.js";
import { CinemaHall } from "../PGmodels/CinemaHall/Cinemahall.js";
import { CityCinemaHall } from "../PGmodels/City/CityCinemhalll.js";
import { CityCheck } from "../PGmodels/CityCheck/CityCheck.js";
// import { Movie } from "../models/movie/Movie.js";
// import { MovieCinemaHall } from "../models/movie/MovieCinemaHall.js";

export class CinemaHallService {
  async getCinemaHallsByCityId(cityId: string) {
    try {
      const cityCinemaHalls = await CityCinemaHall.findAll({
        where: { cityId },
        include: [
          {
            model: CinemaHall,
            as: "cinemaHall",
            attributes: ["id", "name", "location", "zipcode", "directionsLink"],
            include: [
              {
                model: CinemaHallImage,
                as: "images",
                attributes: ["imageUrl"],
              },
            ],
          },
        ],
      });
      const cinemaHalls = cityCinemaHalls.map((cityCinemaHall) =>
        cityCinemaHall.cinemaHall.toJSON()
      );
      return cinemaHalls;
    } catch (error) {
      console.error(
        `Error fetching cinema halls for city ID ${cityId}:`,
        error
      );
      throw new Error(`Failed to fetch cinema halls for city ID ${cityId}`);
    }
  }

  async getCinemaHallsByCityIdAndMovieId(cityId: string, movieId: string) {
    try {
      const cityChecks = await CityCheck.findAll({
        where: { cityId, movieId },
        include: [
          {
            model: CinemaHall,
            as: "cinemaHall",
            attributes: ["id","name", "location", "zipcode", "directionsLink"],
          },
        ],
      });

      if (!cityChecks || cityChecks.length === 0) {
        return "No cinema halls found for this movie in the specified city";
      }

      const cinemaHalls = cityChecks.map((cityCheck) => cityCheck.cinemaHall);
      return cinemaHalls;
    } catch (error) {
      console.error(
        `Error fetching cinema halls for city ID ${cityId} and movie ID ${movieId}:`,
        error
      );
      throw new Error(
        `Failed to fetch cinema halls for city ID ${cityId} and movie ID ${movieId}`
      );
    }
  }
}
