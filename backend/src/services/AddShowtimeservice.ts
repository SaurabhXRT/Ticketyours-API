import { Showtime } from "../PGmodels/Showtime/Showtime.js";
import { Screen } from "../PGmodels/Theatorscreens/Screen.js";
import { MovieInTheatre } from "../PGmodels/MovieInTheatre/Movieintheatre.js";
import { MovieScreen } from "../PGmodels/Theatorscreens/MovieScreen.js";
import { Op } from "sequelize";

export class ShowtimeService {

  async createShowtime(data: any) {

    const { movieInTheatreId, screenId, cinemaHallId, startTime, endTime, showTimeDate } = data;
    
    try {
      const screen = await Screen.findByPk(screenId);
      if (!screen) {
        throw new Error("Screen not found.");
      }

      const movieInTheatre = await MovieInTheatre.findOne({
        where: {
          id: movieInTheatreId,
          runningStatus: "running", 
        }
      });
      if (!movieInTheatre) {
        throw new Error("Movie in Theatre not found.");
      }
      const  movieId = movieInTheatre.movieId;
      const movieScreen = await MovieScreen.findOne({
        where: {
          screenId: screenId,
          CinemahallmovieId: movieInTheatreId,
        }
      });

      if (!movieScreen) {
        throw new Error("Movie is not assigned to this screen.");
      }
      if (
        new Date(showTimeDate) < new Date(movieScreen.movieopendate) ||
        new Date(showTimeDate) > new Date(movieScreen.movieclosedate)
      ) {
        throw new Error("Showtime date exceeds the movie's open or close date.");
      }

      const existingShowtime = await Showtime.findOne({
        where: {
          screenId,
          [Op.or]: [
            {
              startTime: {
                [Op.between]: [startTime, endTime],
              },
            },
            {
              endTime: {
                [Op.between]: [startTime, endTime],
              },
            },
            {
              [Op.and]: [
                {
                  startTime: {
                    [Op.lte]: startTime,
                  },
                },
                {
                  endTime: {
                    [Op.gte]: endTime,
                  },
                },
              ],
            },
          ],
        },
      });

      if (existingShowtime) {
        throw new Error(
          "There is already a showtime scheduled that overlaps with the provided time."
        );
      }

      const newShowtime = await Showtime.create({
        screenId,
        cinemaHallId,
        movieInTheatreId,
        movieId,
        startTime,
        endTime,
        showTimeDate,
      });

      return newShowtime;
    } catch (error) {
      console.log(error.message);
      throw new Error("error creating showtime");
    }
  }
}
