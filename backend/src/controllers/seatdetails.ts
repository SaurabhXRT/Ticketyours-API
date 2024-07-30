import { SeatDetailService } from '../services/SeatDetailService.js';

const seatDetailService = new SeatDetailService();

export const getSeatDetails = async (req: any, res: any) => {
  const { showtimeId } = req.params;

  try {
    const seatDetails = await seatDetailService.getSeatDetailsByShowtimeId(showtimeId);
    res.status(200).json({
      code: "seatdetails/fetch-success",
      message: "Seat details fetched successfully",
      data: seatDetails,
    });
  } catch (error) {
    res.status(404).json({
      code: "seatdetails/not-found",
      message: error.message,
    });
  }
};
