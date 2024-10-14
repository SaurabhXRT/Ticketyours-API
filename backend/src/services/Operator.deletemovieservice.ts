import { MovieInTheatre } from "../PGmodels/MovieInTheatre/Movieintheatre.js";
import { CinemaHallMovie } from "../PGmodels/CinemaHall/CinemahallMovie.js";
import { CityCheck } from "../PGmodels/CityCheck/CityCheck.js";
import { CityMovie } from "../PGmodels/City/CityMovie.js";

export class DeleteMovieService {
  async deleteMovie(movieInTheatreId: any, cinemaHallId: any, cityId: any) {
    const transaction = await MovieInTheatre.sequelize.transaction();
    try {
      const movieInTheatre = await MovieInTheatre.findOne({
        where: { id: movieInTheatreId },
        transaction,
      });

      if (!movieInTheatre) {
        return "MovieInTheatre not found";
      }

      const movieId = movieInTheatre.movieId;

      const movieintheatrestatus = await MovieInTheatre.findOne({
        where: { id: movieInTheatreId },
        transaction,
      });
      await movieintheatrestatus.update(
        { runningStatus: "completed" },
        { transaction }
      );

      // await CinemaHallMovie.destroy({
      //   where: { cinemaHallId, CinemahallmovieId: movieInTheatreId },
      //   transaction,
      // });

      await CityCheck.destroy({
        where: { movieId, cinemaHallId, cityId },
        transaction,
      });

      const movieInCityExists = await CityCheck.findOne({
        where: { movieId, cityId },
        transaction,
      });

      if (!movieInCityExists) {
        await CityMovie.destroy({
          where: { cityId, movieId },
          transaction,
        });
      }

      await transaction.commit();
      return {
        success: true,
        message: "Movie removed from cinema hall successfully",
      };
    } catch (error) {
      await transaction.rollback();
      console.error("Error removing movie from cinema hall:", error);
      throw new Error("Failed to remove movie from cinema hall");
    }
  }
}
