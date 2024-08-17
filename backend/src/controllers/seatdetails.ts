import { SeatDetailService } from '../services/SeatDetailService.js';

const seatDetailService = new SeatDetailService();

export const reserveSeatStatus = async (req: any, res: any) => {
   // #swagger.description = 'reserved the seat'
  const { showtimeId } = req.params;
  const {seatRow, seatNumber, status} = req.body;
  const seatdata = {
    showtimeId,
    seatRow, 
    seatNumber, 
    status
  }

  try {
    const seatReserved = await seatDetailService.reserveseatStatus(seatdata);
    res.status(200).json({
      code: "seatdetails/seat-reserved",
      message: "Seat status updated to reserved successfully",
      data: seatReserved,
    });
  } catch (error) {
    res.status(404).json({
      code: "seatdetails/not-found",
      message: error.message,
    });
  }
};
