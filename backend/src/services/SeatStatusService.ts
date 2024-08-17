import { SeatStatus } from '../PGmodels/TheatorSeats/Seats.js';

export class SeatStatusService {

  async getSeatStatusesByShowtimeId(showtimeId: any) {
    
    try {
      const seatStatuses = await SeatStatus.findAll({
        where: { showtimeId },
        attributes: ['seatRow', 'seatNumber', 'status'],
      });

      return seatStatuses;
    } catch (error) {
      console.error('Error fetching seat statuses:', error);
      throw new Error('Failed to fetch seat statuses');
    }
  }
}
