import { CinemaHallMovie } from "../PGmodels/CinemaHall/CinemahallMovie.js";
import { CityMovie } from "../PGmodels/City/CityMovie.js";
import { Movie } from '../PGmodels/Movie/Movie.js';
import { Crew } from '../PGmodels/MovieDetail/Crew.js';
import { Cast } from '../PGmodels/MovieDetail/Cast.js';
import { MovieInTheatre } from "../PGmodels/MovieInTheatre/Movieintheatre.js";


export class MovieService {

  async getMoviesByCityId(cityId: string) {
    try {
      const cityMovies = await CityMovie.findAll({
        where: { cityId },
        include: [{
          model: Movie,
          as: 'movie',
          attributes: ['title', 'posterUrl', 'genre', 'releaseDate', 'duration', 'description'],
        }],
      });
  
      if (!cityMovies || cityMovies.length === 0) {
        return "No movies found for this city";
      }
  
      const movies = cityMovies.map(cityMovie => cityMovie.movie);
      return movies;
    } catch (error) {
      console.error(`Error fetching movies for city ${cityId}:`, error);
      throw new Error(`Failed to fetch movies for city ${cityId}`);
    }
  }

  async getMoviesByCinemaHallId(cinemaHallId: string) {
    try {
  
      const moviesInCinemaHall = await CinemaHallMovie.findAll({
        where: { cinemaHallId },
        include: [{
          model: MovieInTheatre,
          as: "movieInTheatre",
          attributes: ['title', 'posterUrl', 'genre', 'releaseDate', 'duration', 'description'],
        }]
      });

      if (!moviesInCinemaHall || moviesInCinemaHall.length === 0) {
        return null;
      }

      const movies = moviesInCinemaHall.map(chm => chm.movieInTheatre);
      return movies;
    } catch (error) {
      console.error(`Error fetching movies for cinema hall ${cinemaHallId}:`, error);
      throw new Error(`Failed to fetch movies for cinema hall ${cinemaHallId}`);
    }
  }

  async getMovieDetailById(movieId: any) {
    try {
      const movie = await Movie.findByPk(movieId, {
        include: [
          {
            model: Cast,
            through: { attributes: [] },
            as: 'casts'
          },
          {
            model: Crew,
            through: { attributes: [] }, 
            as: 'crews'
          }
        ],
      });
  
      if (!movie) {
        throw new Error('Movie does not exist');
      }
  
      // Convert the movie instance to a JSON object
      return movie.toJSON();
    } catch (error) {
      console.error(`Error fetching movie details:`, error);
      throw new Error(`Failed to fetch movie details`);
    }
  }

  // async searchMoviesByName(title: string) {
  //   try {
  //     const movies = await Movie.find({
  //       title: { $regex: new RegExp(title, 'i') }
  //     });
  //     return movies;
  //   } catch (error) {
  //     console.error(`Error searching movies by name ${title}:`, error);
  //     throw new Error(`Failed to search movies by name ${title}`);
  //   }
  // }
}
