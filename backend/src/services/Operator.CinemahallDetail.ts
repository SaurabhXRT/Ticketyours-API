import { CinemaHall } from "../PGmodels/CinemaHall/Cinemahall.js";
import { CinemaHallMovie } from "../PGmodels/CinemaHall/CinemahallMovie.js";
import { MovieInTheatre } from "../PGmodels/MovieInTheatre/Movieintheatre.js";

export class getCinemhalldetail {
  async getcinemhallDetail(operatorId: any) {
    try {
      const cinemahalldetail = await CinemaHall.findOne({
        where: {
          operatorId: operatorId,
        },
      });
      if (!cinemahalldetail) {
        return "no cinemahall found for this operator";
      }
      return cinemahalldetail;
    } catch (error) {
      console.log(error);
      throw new Error("error fetching cinemahall");
    }
  }

  async getCinemhallMovie(operatorId: any) {
    try {
      const cinemahall = await CinemaHall.findOne({
        where: {
          operatorId: operatorId,
        },
      });

      if (!cinemahall) {
        return "no cinemahall found for this operator";
      }

      const moviesInCinemaHall = await CinemaHallMovie.findAll({
        where: {
          cinemaHallId: cinemahall.id,
        },
        include: [
          {
            model: MovieInTheatre,
            as: "movieInTheatre",
            attributes: [
              "id",
              "title",
              "posterUrl",
              "genre",
              "releaseDate",
              "duration",
              "description",
            ],
          },
        ],
      });

      if (!moviesInCinemaHall || moviesInCinemaHall.length === 0) {
        return null;
      }

      const movies = moviesInCinemaHall.map((chm) => chm.movieInTheatre);

      return movies;
      
    } catch (error) {
      console.error("Error fetching movies for cinema hall", error);
      throw new Error("Failed to fetch movies for cinema hall");
    }
  }
}
