import ShowtimeSlot from '../models/Showtime_slot.js';

export class SeatDetailService {

  async getSeatDetailsByShowtimeId(showtimeId: string) {
    try {
      const showtime = await ShowtimeSlot.findById(showtimeId);
      if (!showtime) {
        throw new Error("Showtime not found");
      }

    //   const totalSeats = showtime.seats.length;
    //   const availableSeats = showtime.seats.filter(seat => seat.status === 'available').length;
    //   const bookedSeats = showtime.seats.filter(seat => seat.status === 'booked').length;

    //   const seatDetails = {
    //     totalSeats,
    //     availableSeats,
    //     bookedSeats,
    //     seatPrices: showtime.seats.map(seat => ({
    //       seat_number: seat.seat_number,
    //       seat_type: seat.seat_type,
    //       price: seat.price,
    //       status: seat.status
    //     }))
    //   };

     // return seatDetails;
     return showtime;
    } catch (error) {
      console.error(`Error fetching seat details for showtime ${showtimeId}:`, error);
      throw new Error(`Failed to fetch seat details for showtime ${showtimeId}`);
    }
  }

  async lockSeats(showtimeId: string, seatNumbers: string[], lockDuration: number = 10) {
    const lockedUntil = new Date();
    lockedUntil.setMinutes(lockedUntil.getMinutes() + lockDuration);

    const showtime = await ShowtimeSlot.findById(showtimeId);
    if (!showtime) {
      throw new Error('Showtime not found');
    }

    seatNumbers.forEach(seatNumber => {
      const seat = showtime.seats.find(seat => seat.seat_number === seatNumber);
      if (seat && seat.status === 'available') {
        seat.status = 'locked';
        seat.locked_until = lockedUntil;
      }
    });

    await showtime.save();
    return showtime;
  }

  async releaseExpiredLocks() {
    const now = new Date();
    const showtimes = await ShowtimeSlot.find({ 'seats.locked_until': { $lte: now } });

    showtimes.forEach(async showtime => {
      showtime.seats.forEach(seat => {
        if (seat.status === 'locked' && seat.locked_until <= now) {
          seat.status = 'available';
          seat.locked_until = undefined;
        }
      });
      await showtime.save();
    });
  }
  

  
}
