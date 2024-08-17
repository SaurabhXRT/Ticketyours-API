import { Showtime } from "../PGmodels/Showtime/Showtime.js";
import { SeatStatus } from "../PGmodels/TheatorSeats/Seats.js";

export class SeatDetailService {
  async reserveseatStatus(data: any) {
    const { showtimeId, seatRow, seatNumber, status } = data;

    try {
      const showtime = await Showtime.findByPk(showtimeId);
      if (!showtime) {
        throw new Error("Showtime not found");
      }

      const updatedseatstatus = await SeatStatus.create({
        seatRow,
        seatNumber,
        status,
      });

      return updatedseatstatus;
    } catch (error) {
      console.error(error);
      throw new Error("error updating setstatus");
    }
  }

  // async lockSeats(
  //   showtimeId: string,
  //   seatNumbers: string[],
  //   lockDuration: number = 10
  // ) {
  //   const lockedUntil = new Date();
  //   lockedUntil.setMinutes(lockedUntil.getMinutes() + lockDuration);

  //   const showtime = await ShowtimeSlot.findById(showtimeId);
  //   if (!showtime) {
  //     throw new Error("Showtime not found");
  //   }

  //   seatNumbers.forEach((seatNumber) => {
  //     const seat = showtime.seats.find(
  //       (seat) => seat.seat_number === seatNumber
  //     );
  //     if (seat && seat.status === "available") {
  //       seat.status = "locked";
  //       seat.locked_until = lockedUntil;
  //     }
  //   });

  //   await showtime.save();
  //   return showtime;
  // }

  // async releaseExpiredLocks() {
  //   const now = new Date();
  //   const showtimes = await ShowtimeSlot.find({
  //     "seats.locked_until": { $lte: now },
  //   });

  //   showtimes.forEach(async (showtime) => {
  //     showtime.seats.forEach((seat) => {
  //       if (seat.status === "locked" && seat.locked_until <= now) {
  //         seat.status = "available";
  //         seat.locked_until = undefined;
  //       }
  //     });
  //     await showtime.save();
  //   });
  // }
}
