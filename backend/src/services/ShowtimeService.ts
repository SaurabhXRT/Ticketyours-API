import { Showtime } from '../PGmodels/Showtime/Showtime.js';

export class ShowtimeService {
 
  async getShowtimesByScreenId(screenId: any) {
    try {
      const showtimes = await Showtime.findAll({
        where: {
          screenId: screenId,
        },
      });
      return showtimes;
    } catch (error) {
      console.error(`Error fetching showtimes for screen ${screenId}:`, error);
      throw new Error(`Failed to fetch showtimes for screen ${screenId}`);
    }
  }
  
  async getShowtimesByScreenIdAndDate(screenId: any , selectedDate: any) {
    try {
      const showtimes = await Showtime.findAll({
        where: {
          screenId: screenId,
          showTimeDate: selectedDate,
        },
      });
      return showtimes;
    } catch (error) {
      console.error(`Error fetching showtimes for screen ${screenId} and date ${selectedDate}:`, error);
      throw new Error(`Failed to fetch showtimes for screen ${screenId} and date ${selectedDate}`);
    }
  }
}
