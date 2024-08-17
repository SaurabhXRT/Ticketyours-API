import { TheatreLayout } from '../PGmodels/TheatorLayout/TheatorLayout.js';

export class TheatreLayoutService {
  async createTheatreLayout(cinemaHallId: any, seatArrangement: any) {
    try {
      const layoutexist = await TheatreLayout.findOne({
        where: {
          cinemaHallId : cinemaHallId
        }
      });
      
      if(layoutexist){
        throw new Error("a theatre layout already exist for this cinemahall");
      }
      const newLayout = await TheatreLayout.create({
        cinemaHallId,
        seatArrangement,
      });
      return newLayout;
    } catch (error) {
      throw new Error('Error creating theatre layout');
    }
  }

  async getTheatreLayout(cinemaHallId: any) {
    try {
      const layout = await TheatreLayout.findOne({
        where: { cinemaHallId },
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