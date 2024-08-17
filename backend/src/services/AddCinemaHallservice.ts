import { CinemaHall } from "../PGmodels/CinemaHall/Cinemahall.js";
import { CityCinemaHall } from "../PGmodels/City/CityCinemhalll.js";
//import { City } from "../models/city/City.js";

export class AddCinemaHallservice {
  async addcinemahall(data: any) {
    const transaction = await CinemaHall.sequelize.transaction();
    try {
      const newCinemaHall = await CinemaHall.create(
        {
          ...data,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { transaction }
      );

      await CityCinemaHall.create(
        {
          cityId: data.cityId,
          cinemaHallId: newCinemaHall.id,
        },
        { transaction }
      );

      await transaction.commit();
      return newCinemaHall.toJSON();
    } catch (error) {
      await transaction.rollback();
      console.error("Error adding cinema hall:", error);
      throw new Error("Failed to add cinema hall");
    }
  }

  async findCinemaHallByNameAndOperator(name: string, operatorId: number) {
    try {
      const cinemaHall = await CinemaHall.findOne({
        where: {
          name,
          operatorId,
        },
      });
      return cinemaHall ? cinemaHall.toJSON() : null;
    } catch (error) {
      console.error(
        `Error finding cinema hall with name ${name} and operatorId ${operatorId}:`,
        error
      );
      throw new Error(
        `Failed to find cinema hall with name ${name} and operatorId ${operatorId}`
      );
    }
  }
}
