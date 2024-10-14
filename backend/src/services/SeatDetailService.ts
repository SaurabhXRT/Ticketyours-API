import { Showtime } from "../PGmodels/Showtime/Showtime.js";
import { SeatStatus } from "../PGmodels/TheatorSeats/Seats.js";

export class SeatDetailService {
  async reserveseatStatus(data: any) {
    const transaction = await SeatStatus.sequelize.transaction();
    const { showtimeId, seatRow, seatNumber, status } = data;

    try {
      const showtime = await Showtime.findByPk(showtimeId);
      if (!showtime) {
        throw new Error("Showtime not found");
      }

      const updatedseatstatus = await SeatStatus.create(
        {
          showtimeId,
          seatRow,
          seatNumber,
          status,
        },
        { transaction }
      );
      await transaction.commit();
      return updatedseatstatus;
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      throw new Error("error updating setstatus");
    }
  }
}
