import { MovieInTheatre } from '../PGmodels/MovieInTheatre/Movieintheatre.js';
import { CinemaHallMovie } from '../PGmodels/CinemaHall/CinemahallMovie.js';
import { CityCheck } from '../PGmodels/CityCheck/CityCheck.js';
import { CityMovie } from '../PGmodels/City/CityMovie.js';
import { Movie } from '../PGmodels/Movie/Movie.js';
import { Identifier, Sequelize } from 'sequelize';
import { centralDatabase } from ".././config/dbconfig.js"; 

export class AddMovieService {
  async addMovieToCinemaHall(operatorId: any, cinemaHallId: any, movieId: Identifier, cityId: any) {
    const sequelize = centralDatabase.getInstance(); 
    const transaction = await sequelize.transaction();

    try {
    
      const existingEntry = await MovieInTheatre.findOne({
        where: {
          movieId,
        }
      });

      if (existingEntry) {
        return "This movie is already in your cinema hall";
      }

     
      const movie = await Movie.findByPk(movieId);
      if (!movie) {
        return "Movie not found";
      }

      // Add MovieInTheatre 
      const movieInTheatre = await MovieInTheatre.create({
        movieId: movie.id,
        title: movie.title,
        description: movie.description,
        genre: movie.genre,
        duration: movie.duration,
        releaseDate: movie.releaseDate,
        posterUrl: movie.posterUrl,
      }, { transaction });

      await CinemaHallMovie.create({
        cinemaHallId,
        CinemahallmovieId: movieInTheatre.id
      }, { transaction });

    
      await CityCheck.create({
        movieId,
        cinemaHallId,
        cityId
      }, { transaction });

      const cityMovieExists = await CityMovie.findOne({
        where: { 
          cityId, 
          movieId 
        },
        transaction
      });

      if (!cityMovieExists) {
        await CityMovie.create({
          cityId,
          movieId
        }, { transaction });
      }

      await transaction.commit();
      return movieInTheatre; 
    } catch (error) {
      await transaction.rollback();
      console.error("Error adding movie to cinema hall:", error);
      throw new Error("Failed to add movie to cinema hall");
    }
  }
}
