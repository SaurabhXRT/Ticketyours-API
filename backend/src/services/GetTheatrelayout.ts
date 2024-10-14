import { TheatreLayout } from '../PGmodels/TheatorLayout/TheatorLayout.js';
import { Showtime } from '../PGmodels/Showtime/Showtime.js';

export class GetTheatreLayoutService {

  async getLayoutByShowtimeId(showtimeId: any, screenId:any) {
    try {
     
      const showtime = await Showtime.findByPk(showtimeId);
      if (!showtime) {
        throw new Error('Showtime not found');
      }

      const cinemaHallId = showtime.cinemaHallId;
    
      const layout = await TheatreLayout.findOne({
        where: { 
          cinemaHallId : cinemaHallId,
          cinemaHallscreenId: screenId
        },
        attributes: ['seatArrangement'],
      });

      return layout;
      
    } catch (error) {
      console.error('Error fetching theatre layout:', error);
      throw new Error('Failed to fetch theatre layout');
    }
  }
}
