import { ShowtimeService } from "../services/ShowtimeService.js";
const showtimeservice = new ShowtimeService();

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

