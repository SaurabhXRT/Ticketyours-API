import MovieInCinemaHall from "../models/Moviemodel.js";
import CinemaHall from "../models/cinema_hall/CinemaHall.js";
import { MovieService } from "./MovieService.js";
import CityModel from "../models/city/City.model.js";
import { ClientSession } from "mongodb";

export class AddMovieService {
  async addMovieToCinemaHall(operatorId: string, cinemaHallId: string, movieId: string) {
    const session = await MovieInCinemaHall.startSession();
    session.startTransaction();
    try {
      const cinemaHall = await CinemaHall.findOne({
        _id: cinemaHallId,
        operator_id: operatorId,
      }).session(session);
      if (!cinemaHall) {
        throw new Error("Cinema hall not found or does not belong to the operator");
      }

      const service = new MovieService();
      const movieData = await service.getMovieDetailById(movieId);

      const newMovieInCinemaHall = await MovieInCinemaHall.create([{
        movie_id: movieId,
        cinema_hall_id: cinemaHallId,
        title: movieData.title,
        description: movieData.description,
        genre: movieData.genre,
        duration: movieData.duration,
        release_date: movieData.release_date,
        end_date: movieData.end_date,
        poster_url: movieData.poster_url,
        created_at: new Date(),
        updated_at: new Date(),
      }], { session });


      await CinemaHall.findByIdAndUpdate(
        cinemaHallId,
        { $push: { movies: newMovieInCinemaHall[0]._id } },
        { new: true, session }
      );

       const city = await CityModel.findOne({ _id: cinemaHall.city_id }).session(session);
       if (!city) {
         throw new Error("City not found for the given cinema hall");
       }
 
      await this.updateCityMovies(city._id, newMovieInCinemaHall[0]._id, session);

      await session.commitTransaction();
      return cinemaHall.toJSON();
    } catch (error) {
      await session.abortTransaction();
      console.error("Error adding movie to cinema hall:", error);
      throw new Error("Failed to add movie to cinema hall");
    } finally {
      session.endSession();
    }
  }

  // Helper function to check and update CityModel
  async updateCityMovies(cityId: any, movieId: any, session: ClientSession) {
    const city = await CityModel.findById(cityId).session(session);
    if (!city) {
      throw new Error("City not found");
    }
    const movieAlreadyInCity = city.cinemaMovies.includes(movieId);
    if (!movieAlreadyInCity) {
      await CityModel.findByIdAndUpdate(
        cityId,
        { $push: { cinemaMovies: movieId } },
        { new: true, session }
      );
    }
  }
}
