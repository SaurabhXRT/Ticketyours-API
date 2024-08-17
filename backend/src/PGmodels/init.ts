import { Database, DbOptions } from "../database/database.js";
import dotenv from "dotenv-flow";
dotenv.config();
import logger from "../logger/logger.js";
import { User } from "./User/User.js";
import { City } from "./City/City.js";
import { UserLoginSession } from "./LoginSession/User.Loginsession.js";
import { CinemaOperator } from "./Operator/Operator.js";
import { Movie } from "./Movie/Movie.js";
import { Cast } from "./MovieDetail/Cast.js";
import { MovieCast } from "./Movie/MovieCast.js";
import { Crew } from "./MovieDetail/Crew.js";
import { MovieCrew } from "./Movie/MovieCrew.js";
import { OperatorLoginSession } from "./LoginSession/Operator.Loginsession.js";
import { CinemaHall } from "./CinemaHall/Cinemahall.js";
import { CityCinemaHall } from "./City/CityCinemhalll.js";
import { CityCheck } from "./CityCheck/CityCheck.js";
import { MovieInTheatre } from "./MovieInTheatre/Movieintheatre.js";
import { CinemaHallMovie } from "./CinemaHall/CinemahallMovie.js";
import { CityMovie } from "./City/CityMovie.js";
import { CinemaHallImage } from "./CinemaHall/CinemaHallImage.js";
import { CinemaHallReview } from "./CinemaHallreview/Review.js";
import { Screen } from "./Theatorscreens/Screen.js";
import { MovieScreen } from "./Theatorscreens/MovieScreen.js";
import { TheatreLayout } from "./TheatorLayout/TheatorLayout.js";
import { Showtime } from "./Showtime/Showtime.js";
import { SeatStatus } from "./TheatorSeats/Seats.js";

export async function initDatabase(db: Database, dbOptions: DbOptions) {
  await db.initInstance(dbOptions);
  await User.sync();
  logger.log("user model initiated successfully");
  await City.sync();
  logger.log("city model initiated successfully");
  await UserLoginSession.sync();
  logger.log("loginsession model initiated successfully");
  await CinemaOperator.sync();
  logger.log("cinemoperator model initiated successfully");
  await Movie.sync();
  logger.log("movie model initiated successfully");
  await Cast.sync();
  logger.log("cast model initiated succesfully");
  await MovieCast.sync();
  logger.log("moviecast model initiated successfully");
  await Crew.sync();
  logger.log("crew model initiated successfully");
  await MovieCrew.sync();
  logger.log("moviecrew model initiated successfully");
  await OperatorLoginSession.sync();
  logger.log("operatorloginsesion created successfully");
  await CinemaHall.sync();
  logger.log("CinemaHall model initiated successfully");
  await CityCinemaHall.sync();
  logger.log("CityCinemaHall model initiated successfully");

  Movie.belongsToMany(Cast, {
    through: MovieCast,
    foreignKey: "movieId",
    as: "casts",
  });

  Cast.belongsToMany(Movie, {
    through: MovieCast,
    foreignKey: "castId",
    as: "movies",
  });

  Movie.belongsToMany(Crew, {
    through: MovieCrew,
    foreignKey: "movieId",
    as: "crews",
  });

  Crew.belongsToMany(Movie, {
    through: MovieCrew,
    foreignKey: "crewId",
    as: "movies",
  });

  User.hasMany(UserLoginSession, {
    foreignKey: "userId",
    as: "userloginSessions",
  });
  UserLoginSession.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  CinemaOperator.hasMany(OperatorLoginSession, {
    foreignKey: "operatorId",
    as: "operatorloginsessions",
  });

  OperatorLoginSession.belongsTo(CinemaOperator, {
    foreignKey: "operatorId",
    as: "operator",
  });

  City.belongsToMany(CinemaHall, {
    through: CityCinemaHall,
    foreignKey: "cityId",
    as: "cinemaHalls",
  });

  CinemaHall.belongsToMany(City, {
    through: CityCinemaHall,
    foreignKey: "cinemaHallId",
    as: "cities",
  });

  CityCinemaHall.belongsTo(CinemaHall, {
    foreignKey: "cinemaHallId",
    as: "cinemaHall",
  });

  CityCinemaHall.belongsTo(City, {
    foreignKey: "cityId",
    as: "city",
  });

  await CityCheck.sync();
  logger.log("citycheck model initiated successfully");
  await MovieInTheatre.sync();
  logger.log("movieintheatre model initiated successfullyy");
  await CityMovie.sync();
  logger.log("citymovie model initiuated successfully");
  await CinemaHallMovie.sync();
  logger.log("cinemhall movie initiated successfully");

  MovieInTheatre.belongsTo(Movie, {
    foreignKey: "movieId",
    as: "movie",
  });

  Movie.hasMany(MovieInTheatre, {
    foreignKey: "movieId",
    as: "movieInTheatres",
  });

  CinemaHallMovie.belongsTo(CinemaHall, {
    foreignKey: "cinemaHallId",
    as: "cinemaHall",
  });

  CinemaHallMovie.belongsTo(MovieInTheatre, {
    foreignKey: "CinemahallmovieId",
    as: "movieInTheatre",
  });

  CinemaHall.hasMany(CinemaHallMovie, {
    foreignKey: "cinemaHallId",
    as: "cinemaHallMovies",
  });

  MovieInTheatre.hasMany(CinemaHallMovie, {
    foreignKey: "CinemahallmovieId",
    as: "cinemaHallMovies",
  });

  CityCheck.belongsTo(CinemaHall, {
    foreignKey: "cinemaHallId",
    as: "cinemaHall",
  });

  CityCheck.belongsTo(Movie, {
    foreignKey: "movieId",
    as: "movie",
  });

  CityCheck.belongsTo(City, {
    foreignKey: "cityId",
    as: "city",
  });

  CityMovie.belongsTo(Movie, {
    foreignKey: "movieId",
    as: "movie",
  });

  CityMovie.belongsTo(City, {
    foreignKey: "cityId",
    as: "city",
  });

  await CinemaHallImage.sync();
  logger.log("cinemhallimage model created successfully");

  CinemaHall.hasMany(CinemaHallImage, {
    foreignKey: "cinemaHallId",
    as: "images",
  });

  CinemaHallImage.belongsTo(CinemaHall, {
    foreignKey: "cinemaHallId",
    as: "cinemaHall",
  });

  await CinemaHallReview.sync();
  logger.log("cinemhallreview model initiated successfully");

  CinemaHall.hasMany(CinemaHallReview, {
    foreignKey: "cinemaHallId",
    as: "reviews",
  });

  CinemaHallReview.belongsTo(CinemaHall, {
    foreignKey: "cinemaHallId",
    as: "cinemaHall",
  });

  await Screen.sync();
  logger.log("screen model initiated successfully");
  await MovieScreen.sync();
  logger.log("moviescreen model inityiated successfully");

  Screen.hasOne(MovieScreen, {
    foreignKey: "screenId",
  });

  MovieScreen.belongsTo(Screen, {
    foreignKey: "screenId",
  });

  MovieInTheatre.hasMany(MovieScreen, {
    foreignKey: "CinemahallmovieId",
  });

  MovieScreen.belongsTo(MovieInTheatre, {
    foreignKey: "CinemahallmovieId",
  });

  await TheatreLayout.sync();
  logger.log("theatrelayout model initiated successfully");

  TheatreLayout.belongsTo(CinemaHall, {
    foreignKey: 'cinemaHallId',
    as: 'cinemaHall', 
  });

  CinemaHall.hasOne(TheatreLayout, {
    foreignKey: 'cinemaHallId',
    as: 'theatreLayouts',
  });

  await Showtime.sync();
  logger.log("showtime model has been initialised successfully");
  await SeatStatus.sync();
  logger.log("seatstatus model has been iniotialized successfully");

  Showtime.hasMany(SeatStatus, {
    foreignKey: 'showtimeId',
    as: 'seatStatuses',  
  });

  SeatStatus.belongsTo(Showtime, {
    foreignKey: 'showtimeId',
    as: 'showtime', 
  });


  Screen.hasMany(Showtime, {
    foreignKey: 'screenId',
    as: 'showtimes', 
  });

  Showtime.belongsTo(Screen, {
    foreignKey: 'screenId',
    as: 'screen',  
  });

  CinemaHall.hasMany(Showtime, {
    foreignKey: "cinemaHallId",
    as: "showtimes",
  });

  Showtime.belongsTo(CinemaHall, {
    foreignKey: "cinemaHallId",
    as: "cinemhalls",
  });

  logger.log("All models and associations have been successfully initiated");
}
