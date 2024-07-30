import CinemaHall from "../models/cinema_hall/CinemaHall.js";
import CityModel from "../models/city/City.model.js";

export class AddCinemaHallservice {

  async addcinemahall(data: any) {
    const session = await CinemaHall.startSession();
    session.startTransaction();
    try {
      
      const newCinemaHall = await CinemaHall.create([{
        ...data,
        created_at: new Date(),
        updated_at: new Date(),
      }], { session });

      // Update the city with the new cinema hall's ID
      await CityModel.findOneAndUpdate(
        { cityId: data.city_id},
        { $push: { cinemahalls: newCinemaHall[0]._id } },
        { new: true, session }
      );

      await session.commitTransaction();
      return newCinemaHall[0].toJSON();
    } catch (error) {
      await session.abortTransaction();
      console.error("Error adding cinema hall:", error);
      throw new Error("Failed to add cinema hall");
    } finally {
      session.endSession();
    }
  }

  async findCinemaHallByName(name: string) {
    try {
      const cinemaHall = await CinemaHall.findOne({ name });
      return cinemaHall ? cinemaHall.toJSON() : null;
    } catch (error) {
      console.error(`Error finding cinema hall with name ${name}:`, error);
      throw new Error(`Failed to find cinema hall with name ${name}`);
    }
  }
}
