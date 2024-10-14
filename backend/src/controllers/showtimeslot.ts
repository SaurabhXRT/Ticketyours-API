import {Request,Response} from "express";
import { ShowtimeService } from "../services/ShowtimeService.js";
import { newShowtimeService } from "../services/NewShowtimeService.js";
import logger from "../logger/logger.js";
const showtimeservice = new ShowtimeService();
const newshotimeservice = new newShowtimeService();

export const getShowtimesbyMovieIdAndCityId = async(req:Request,res:Response) => {
  const { movieId, cityId } = req.params;
  try {

  }catch(error){
    logger.log(error);
    if(error.message.includes("error in getting showtimes")){
      return res.status(500).json({
        code: "showtime/internal-server-error",
        message: "error in getting showtimes"
      })
    }
    res.status(500).json({
      code: "showtime/internal-server-error",
      message: "internal server error occured"
    })
  }
}

export const getShowtimesByScreenIdController = async (req: any, res: any) => {
    // #swagger.description = 'get showtime for a movie'
  const { screenId } = req.params;

  try {
    const showtimes = await showtimeservice.getShowtimesByScreenId(screenId);
    res.status(200).json({
      code: 'showtimes/fetch-success',
      message: 'Showtimes fetched successfully',
      data: showtimes,
    });
  } catch (error) {
    res.status(404).json({
      code: 'showtimes/not-found',
      message: error.message,
    });
  }
};

export const getShowtimesByScreenIdAndDateController = async (req: any, res: any) => {
    // #swagger.description = 'get showtime for the selected date'
  const { screenId } = req.params;
  const { selectedDate } = req.body

  try {
    const showtimes = await showtimeservice.getShowtimesByScreenIdAndDate(screenId, selectedDate);
    res.status(200).json({
      code: 'showtimes/fetch-success',
      message: 'Showtimes fetched successfully',
      data: showtimes,
    });
  } catch (error) {
    res.status(404).json({
      code: 'showtimes/not-found',
      message: error.message,
    });
  }
};

