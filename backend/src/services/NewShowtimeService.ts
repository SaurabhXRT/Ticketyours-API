import { Showtime } from "../PGmodels/Showtime/Showtime.js";
import { Screen } from "../PGmodels/Theatorscreens/Screen.js";
import { CityCheck } from "../PGmodels/CityCheck/CityCheck.js";
import { CinemaHall } from "../PGmodels/CinemaHall/Cinemahall.js";
import logger from "../logger/logger.js";
import { Op } from "sequelize";

export class newShowtimeService {
  async getAvailableShowtimesWithDefault(movieId: any, cityId: any) {
    try {
      const cityCheck = await CityCheck.findOne({
        where: {
          movieId: movieId,
          cityId: cityId,
        },
      });

      if (!cityCheck) {
        return "Cinema hall not found";
      }

      const cinemahallId = cityCheck.cinemaHallId;

      const showtimes = await Showtime.findAll({
        where: {
          movieId,
          showTimeDate: {
            [Op.gte]: new Date(),
          },
        },
        include: {
          model: Screen,
          as: "screen",
          attributes: ["screenType", "screenLanguage"],
          include: {
            model: CinemaHall,
            as: "cinemahalls",
            where: {
              id: cinemahallId,
            },
            attributes: ["id", "name", "location"],
          },
        },
      });

      if (showtimes.length === 0) {
        return "No showtimes available";
      }

      const availableDates = [
        ...new Set(
          showtimes.map(
            (showtime) => showtime.showTimeDate.toISOString().split("T")[0]
          )
        ),
      ].sort();

      const screenTypes = [
        ...new Set(
          showtimes.map(
            (showtime) =>
              `${showtime.Screen.screenType}-${showtime.Screen.screenLanguage}`
          )
        ),
      ];

      const defaultDate = availableDates[0];
      const defaultScreenType = screenTypes[0];
      const [defaultScreen, defaultLanguage] = defaultScreenType.split("-");

      const cinemaHalls = await CinemaHall.findAll({
        include: {
          model: Screen,
          as: "screens",
          attributes: ["id"],
          include: {
            model: Showtime,
            as: "showtimes",
            where: {
              movieId,
              showTimeDate: defaultDate,
            },
            attributes: ["id", "startTime", "endTime", "showTimeDate"],
          },
          where: {
            screenType: defaultScreen,
            screenLanguage: defaultLanguage,
          },
        },
        where: {
          id: cinemahallId,
        },
        attributes: ["id", "name", "location"],
      });

      return {
        availableDates,
        screenTypes,
        defaultShowtimes: {
          date: defaultDate,
          screenType: defaultScreenType,
          cinemaHalls,
        },
      };
    } catch (error) {
      logger.log(error);
      throw new Error("error in getting showtimes");
    }
  }

  async getCinemaHallsWithShowtimes(
    movieId: any,
    cityId: any,
    selectedDate: any,
    selectedScreenType: any
  ) {
    try {
      const [screenType, screenLanguage] = selectedScreenType.split("-");

      const cityCheck = await CityCheck.findOne({
        where: {
          movieId: movieId,
          cityId: cityId,
        },
      });

      const cinemahallId = cityCheck.cinemaHallId;

      const cinemaHalls = await CinemaHall.findAll({
        include: {
          model: Screen,
          as: "screens",
          attributes: ["id"], 
          include: {
            model: Showtime,
            as: "showtimes",
            where: {
              movieId,
              showTimeDate: selectedDate,
            },
            attributes: ["id", "startTime", "endTime", "showTimeDate"],
          },
          where: {
            screenType,
            screenLanguage,
          },
        },
        where: {
          id: cinemahallId,
        },
        attributes: ["id", "name", "location"],
      });

      if (!cinemaHalls.length) {
        return "No cinema halls found";
      }

      return cinemaHalls;
    } catch (error) {
      logger.log(error);
      throw new Error("error getting shotimes");
    }
  }
}
