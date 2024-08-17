import { Request, Response } from "express";
import { ShowtimeService } from "../../services/AddShowtimeservice.js";

const service = new ShowtimeService();

export const CreateShowtime = async (req: Request, res: Response) => {
  // #swagger.description = 'create a showtime for a movie which has been alloted a screen'
  const { movieInTheatreId, screenId, startTime, endTime, showTimeDate, cinemaHallId } = req.body;

  if (!movieInTheatreId || !screenId || !startTime || !endTime || !showTimeDate || cinemaHallId) {
    return res.status(400).json({
      code: "fields/empty",
      message: "All fields are required",
    });
  }

  const showtimeData = {
    movieInTheatreId,
    screenId,
    cinemaHallId,
    startTime,
    endTime,
    showTimeDate
  }

  try {
    const newShowtime = await service.createShowtime(showtimeData);

    res.status(201).json({
      code: "showtime/created",
      message: "Showtime has been created successfully",
      data: newShowtime,
    });

  } catch (error) {
    console.error("Error creating showtime:", error);

    if(error.message.includes("Screen not found.")){
      return res.status(404).json({
        code: 'screen/not-found',
        message: "Screen not found or does not belong to your cinema hall.",
      });
    }

    if(error.mesage.includes("Movie in Theatre not found.")){
      return res.status(404).json({
        code: "movie/not-found",
        message: "movie does not found"
      });
    }

    if(error.message.includes("There is already a showtime scheduled")){
      return res.status(401).send({
        code: "showtime/already-exist",
        message: "There is already a showtime scheduled that overlaps with the provided time."
      });
    }

    res.status(500).json({
      code: "server/internal-error",
      message: error.message || "An internal server error occurred while creating the showtime.",
    });
  }
};
