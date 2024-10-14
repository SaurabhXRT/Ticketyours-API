import { Request, Response } from "express";
import { newShowtimeService } from "../services/NewShowtimeService.js";
import logger from "../logger/logger.js";

const newshotimeservice = new newShowtimeService();

export const getShowtimesbyMovieIdAndCityId = async (
  req: Request,
  res: Response
) => {
// #swagger.description = 'get all date list for showtime and screentype and cinemahalls with shwotime for the first showtime date '
  const { movieId, cityId } = req.params;
  if (!movieId || !cityId) {
    return res.status(400).json({
      message: "movieid and cityid are required",   
    });
  }
  try {
    const response = await newshotimeservice.getAvailableShowtimesWithDefault(
      movieId,
      cityId
    );
    if (response === "Cinema hall not found") {
      return res.status(404).json({
        code: "showtime/cinemahall-not-found",
        message: "cinemahall not found",
      });
    }
    if (response === "No showtimes available") {
      return res.status(404).json({
        code: "showtime/moshowtime-available",
        message: "no shotime avaialable",
      });
    }
    res.status(200).json({
      code: "showtime/fetched-successfully",
      mesage: "showtimrs data are feched",
      data: response,
    });
  } catch (error) {
    logger.log(error);
    if (error.message.includes("error in getting showtimes")) {
      return res.status(500).json({
        code: "showtime/internal-server-error",
        message: "error in getting showtimes",
      });
    }
    res.status(500).json({
      code: "showtime/internal-server-error",
      message: "internal server error occured",
    });
  }
};

export const getShowtimesBySelecteddateAndScreentype = async (
  req: Request,
  res: Response
) => {
    // #swagger.description = 'get all showtimes with cinemahalls for selecxtedate and screentype query'
  const { movieId, cityId } = req.params;
  const { selectedDate, selectedScreenType } = req.body;
  if (!selectedDate || !selectedScreenType || !movieId || !cityId) {
    return res.status(400).json({
      message: "selecteddate and cityId and movieId screentype are required",
    });
  }

  try {
    const response = await newshotimeservice.getCinemaHallsWithShowtimes(
      movieId,
      cityId,
      selectedDate,
      selectedScreenType
    );
    if (response === "No cinema halls found") {
      return res.status(404).json({
        code: "showtime/cinemahall-not-found",
        message: response,
      });
    }
    return res.status(200).json({
      code: "showtime/fetched-successfully",
      mesage: "showtimrs data are feched",
      data: response,
    });
  } catch (error) {
    logger.log(error);
    if (error.message.includes("error getting shotimes")) {
      return res.status(500).json({
        code: "showtime/internal-server-error",
        message: "error in getting showtimes",
      });
    }

    res.status(500).json({
      code: "showtimes/server-error",
      message: "internal server error occured",
    });
  }
};
