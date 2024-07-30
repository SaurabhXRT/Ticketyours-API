import { ShowtimeSlotService } from "../services/ShowtimeService.js";
const showtimeservice = new ShowtimeSlotService();

export const getShowtimesByMovieIdAndCinemaHallIdController = async (req: any, res: any) => {
  const { movieId, cinemaHallId } = req.params;

  try {
    const showtimes = await showtimeservice.getShowtimesByMovieIdAndCinemaHallId(movieId, cinemaHallId);
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

export const getShowtimesByCinemaHallIdController = async (req: any, res: any) => {
  const { cinemaHallId } = req.params;

  try {
    const showtimes = await showtimeservice.getShowtimesByCinemaHallId(cinemaHallId);
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

export const getShowtimeSlots = async (req: any, res: any) => {
  const { movieId, cinemaHallId } = req.params;
  const selectedDate = new Date(req.query.date as string);

  try {
    const showtimes = await showtimeservice.getShowtimesByMovieIdAndCinemaHallIdAndDate(movieId, cinemaHallId, selectedDate);
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
