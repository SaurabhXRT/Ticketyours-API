import ShowtimeSlot from '../models/Showtime_slot.js';
import Movie from '../models/Movies.js'; 
import CinemaHall from "../models/cinema_hall/CinemaHall.js";
import MovieInCinemaHall from "../models/Moviemodel.js";

export class ShowtimeSlotService {

  async getShowtimesByMovieIdAndCinemaHallId(movieId: string, cinemaHallId: string) {
    try {
      const showtimes = await ShowtimeSlot.find({
        movie_id: movieId,
        cinema_hall_id: cinemaHallId,
      });
      return showtimes;
    } catch (error) {
      console.error(`Error fetching showtimes for movie ${movieId} and cinema hall ${cinemaHallId}:`, error);
      throw new Error(`Failed to fetch showtimes for movie ${movieId} and cinema hall ${cinemaHallId}`);
    }
  }

  async getShowtimesByCinemaHallId(cinemaHallId: string) {
    try {
      const showtimes = await ShowtimeSlot.find({
        cinema_hall_id: cinemaHallId,
      });
      return showtimes;
    } catch (error) {
      console.error(`Error fetching showtimes for cinema hall ${cinemaHallId}:`, error);
      throw new Error(`Failed to fetch showtimes for cinema hall ${cinemaHallId}`);
    }
  }

  async getShowtimesByMovieIdAndCinemaHallIdAndDate(movieId: string, cinemaHallId: string, selectedDate: Date) {
    try {
      const showtimes = await ShowtimeSlot.find({
        movie_id: movieId,
        cinema_hall_id: cinemaHallId,
        date: selectedDate,
      });
      return showtimes;
    } catch (error) {
      console.error(`Error fetching showtimes for movie ${movieId}, cinema hall ${cinemaHallId}, and date ${selectedDate}:`, error);
      throw new Error(`Failed to fetch showtimes for movie ${movieId}, cinema hall ${cinemaHallId}, and date ${selectedDate}`);
    }
  }

  async getShowtimeById(showtimeId: string) {
    try {
      const showtime = await ShowtimeSlot.findById(showtimeId);
      if (!showtime) {
        throw new Error(`Showtime with ID ${showtimeId} not found`);
      }
      return showtime;
    } catch (error) {
      console.error(`Error fetching showtime with ID ${showtimeId}:`, error);
      throw new Error(`Failed to fetch showtime with ID ${showtimeId}`);
    }
  }

  async getMovieDetailsByShowtimeId(showtimeId: string) {
    try {
      const showtime = await ShowtimeSlot.findById(showtimeId).populate('movie_id');
      if (!showtime) {
        throw new Error(`Showtime with ID ${showtimeId} not found`);
      }
      const movie = await MovieInCinemaHall.findById(showtime.movie_id);
      if (!movie) {
        throw new Error(`Movie with ID ${showtime.movie_id} not found`);
      }
      return movie;
    } catch (error) {
      console.error(`Error fetching movie details for showtime with ID ${showtimeId}:`, error);
      throw new Error(`Failed to fetch movie details for showtime with ID ${showtimeId}`);
    }
  }

  async getCinemaDetailsByShowtimeId(showtimeId: string) {
    try {
      const showtime = await ShowtimeSlot.findById(showtimeId).populate('cinema_hall_id');
      if (!showtime) {
        throw new Error(`Showtime with ID ${showtimeId} not found`);
      }
      const cinemaHall = await CinemaHall.findById(showtime.cinema_hall_id);
      if (!cinemaHall) {
        throw new Error(`Cinema hall with ID ${showtime.cinema_hall_id} not found`);
      }
      return cinemaHall;
    } catch (error) {
      console.error(`Error fetching cinema hall details for showtime with ID ${showtimeId}:`, error);
      throw new Error(`Failed to fetch cinema hall details for showtime with ID ${showtimeId}`);
    }
  }
  
}
