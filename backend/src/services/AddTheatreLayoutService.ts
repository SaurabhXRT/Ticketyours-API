import { TheatreLayout } from '../PGmodels/TheatorLayout/TheatorLayout.js';

export class TheatreLayoutService {
  async createTheatreLayout(cinemaHallId: any, screenId: any, seatArrangement: any) {
    try {
      const layoutexist = await TheatreLayout.findOne({
        where: {
          cinemaHallId : cinemaHallId,
          cinemaHallscreenId: screenId
        }
      });
      
      if(layoutexist){
        throw new Error("a theatre layout already exist for this cinemahall");
      }
      const newLayout = await TheatreLayout.create({
        cinemaHallId,
        cinemaHallscreenId: screenId,
        seatArrangement,
      });
      return newLayout;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getTheatreLayout(cinemaHallId: any, screenId: any) {
    try {
      const layout = await TheatreLayout.findOne({
        where: { 
          cinemaHallId : cinemaHallId,
          cinemaHallscreenId: screenId
        },
      });
      if (!layout) {
        throw new Error('Theatre layout not found');
      }
      return layout;
    } catch (error) {
      throw new Error('Error fetching theatre layout');
    }
  }
}