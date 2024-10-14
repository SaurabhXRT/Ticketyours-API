import { Screen } from "../PGmodels/Theatorscreens/Screen.js";
import { CinemaHall } from "../PGmodels/CinemaHall/Cinemahall.js";

export class AddScreentoCinemaHallservice {
  async addscreentocinemahall(screenData: any) {
    const transaction = await Screen.sequelize.transaction();
    try {
      const cinemaHall = await CinemaHall.findOne({
        where: {
          id: screenData.cinemaHallId,
          operatorId: screenData.operatorId,
        },
      });

      if (!cinemaHall) {
        return 'Cinema hall does not belong to the operator';
      }

      const existingScreen = await Screen.findOne({
        where: {
          cinemaHallId: screenData.cinemaHallId,
          screenNumber: screenData.screenNumber,
        },
      });
  
      if (existingScreen) {
        return 'A screen with this number already exists in the cinema hall.';
      }

      const newScreen = await Screen.create(
        {
          ...screenData,
        },
        { transaction }
      );
      await transaction.commit();
      return newScreen.toJSON();
    } catch (error) {
      console.error("Error in addscreentocinemahall service:", error);
      throw new Error("Failed to add screen to cinema hall.");
    }
  }

  async getcinemahallScreen(operatorId: string){
    try {
      const cinemahall = await CinemaHall.findOne({
        where: {
          operatorId
        }
      });
      if(!cinemahall){
        return "no cinemahall for this operator";
      }
      const cinemahallid = cinemahall.id;
      const cinemahallscreen = await Screen.findOne({
        where : {
          cinemaHallId: cinemahallid,
        }
      });
      if(!cinemahallscreen){
        return "there is no screen in this cinemahall";
      }
      return cinemahallscreen;

    } catch(error){
      console.log(error);
      throw new Error("failed to get screen");
    }
  }
}
