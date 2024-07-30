import CityModel from "../models/city/City.model.js";
import CinemaHall from "../models/cinema_hall/CinemaHall.js";
import Movie from "../models/Movies.js";

export class MovieService {

  async getMoviesByCityId(cityId: string) {
    try {
      const city = await CityModel.findOne({cityId: cityId}).populate('MovieInCinemaHall');
      if (!city) {
        throw new Error("City not found");
      }
      const movies = city.cinemaMovies;
      return movies;
    } catch (error) {
      console.error(`Error fetching movies for city ${cityId}:`, error);
      throw new Error(`Failed to fetch movies for city ${cityId}`);
    }
  }

  async getMoviesByCinemaHallId(cinemaHallId: string) {
    try {
      // Find the cinema hall by ID and populate the movies field
      const cinemaHall = await CinemaHall.findById(cinemaHallId).populate('movies');

      if (!cinemaHall) {
        throw new Error(`Cinema hall with ID ${cinemaHallId} not found`);
      }

      // Extract the movies from the cinema hall object
      const movies = cinemaHall.movies;
      return movies;
    } catch (error) {
      console.error(`Error fetching movies for cinema hall ${cinemaHallId}:`, error);
      throw new Error(`Failed to fetch movies for cinema hall ${cinemaHallId}`);
    }
  }

  async getMovieDetailById(movieId: string){
    try {
        const moviedetail = await Movie.findById(movieId);
        if(!moviedetail){
            throw new Error("movie does not exist");
        }
        return moviedetail.toJSON();

    } catch (error){
      console.error(`Error fetching moviedetails`, error);
      throw new Error(`Failed to fetch movies details`);
    }
  }

  async searchMoviesByName(title: string) {
    try {
      const movies = await Movie.find({
        title: { $regex: new RegExp(title, 'i') }
      });
      return movies;
    } catch (error) {
      console.error(`Error searching movies by name ${title}:`, error);
      throw new Error(`Failed to search movies by name ${title}`);
    }
  }
}
