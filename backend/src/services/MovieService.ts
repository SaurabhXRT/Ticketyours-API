import { CinemaHallMovie } from "../PGmodels/CinemaHall/CinemahallMovie.js";
import { CityMovie } from "../PGmodels/City/CityMovie.js";
import { Movie } from "../PGmodels/Movie/Movie.js";
import { Crew } from "../PGmodels/MovieDetail/Crew.js";
import { Cast } from "../PGmodels/MovieDetail/Cast.js";
import { MovieInTheatre } from "../PGmodels/MovieInTheatre/Movieintheatre.js";
import { Identifier, Sequelize } from "sequelize";
import { MovieReview } from "../PGmodels/MovieRatings/Ratings.js";
import { centralDatabase } from "../config/dbconfig.js";
import { Movievotes } from "../PGmodels/MovieRatings/Upvotes.js";
import { MovieLanguage } from "../PGmodels/Movie/Movielanguage.js";

const sequelize = centralDatabase.getInstance(); 

export class MovieService {
  async getMoviesByCityId(cityId: string) {
    try {
      const cityMovies = await CityMovie.findAll({
        where: { cityId },
        include: [
          {
            model: Movie,
            as: "movie",
            attributes: [
              "id",
              "title",
              "posterUrl",
              "genre",
              "releaseDate",
              "duration",
              "description",
            ],
          },
        ],
      });

      if (!cityMovies || cityMovies.length === 0) {
        return "No movies found for this city";
      }

      const movies = cityMovies.map((cityMovie) => cityMovie.movie);
      const detailresponse = await Promise.all(
        movies.map(async (movies: { id: Identifier; }) => {
          const detail = await Movie.findByPk(movies.id, {
            include: [
              {
                model: MovieReview,
                as: "review",
                attributes: [
                  [
                    sequelize.fn("AVG", sequelize.col("review.star")),
                    "rating",
                  ],
                ],
              },
              {
                model: Movievotes,
                as: 'votes',
                attributes: [
                  [
                    sequelize.fn("COUNT", sequelize.col("votes.upvotes")),
                    "upvotes",
                  ],
                ]  
              }
            ],
           group: ['Movie.id', "review.id", "votes.id"],
          });

          const rating = detail?.get('review')?.rating || 0;
          const upvotes = detail?.get('votes')?.upvotes || 0;

          return {
            id: movies.id,
            title: movies.title,
            posterUrl: movies.posterUrl,
            genre: movies.genre,
            releaseDate:movies.releaseDate,
            duration: movies.duration,
            description: movies.description,
            rating: rating,
            votes: upvotes
          }
        }),
      );
      return detailresponse;
    } catch (error) {
      console.error(`Error fetching movies for city ${cityId}:`, error);
      throw new Error(`Failed to fetch movies for city ${cityId}`);
    }
  }

  async getMoviesByCinemaHallId(cinemaHallId: string) {
    try {
      const moviesInCinemaHall = await CinemaHallMovie.findAll({
        where: { cinemaHallId },
        include: [
          {
            model: MovieInTheatre,
            as: "movieInTheatre",
            attributes: [
              "id",
              "title",
              "posterUrl",
              "genre",
              "releaseDate",
              "duration",
              "description",
            ],
          },
        ],
      });

      if (!moviesInCinemaHall || moviesInCinemaHall.length === 0) {
        return null;
      }

      const movies = moviesInCinemaHall.map((chm) => chm.movieInTheatre);
      return movies;
    } catch (error) {
      console.error(
        `Error fetching movies for cinema hall ${cinemaHallId}:`,
        error
      );
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
            as: "casts",
          },
          {
            model: Crew,
            through: { attributes: [] },
            as: "crews",
          },
          {
            model: MovieReview,
            as: "review",
            attributes: [
              [
                sequelize.fn("AVG", sequelize.col("review.star")),
                "rating",
              ],
            ],
          },
          {
            model: Movievotes,
            as: 'votes',
            attributes: [
              [
                sequelize.fn("COUNT", sequelize.col("votes.upvotes")),
                "upvotes",
              ],
            ],  
          },
          {
            model: MovieLanguage,
            as: "movielanguage",
            attributes: ["language"],
          }
        ],
        group: ['Movie.id', 'casts.id', 'crews.id', "review.id", "votes.id", "movielanguage.id"],
      });

      if (!movie) {
        throw new Error("Movie does not exist");
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
