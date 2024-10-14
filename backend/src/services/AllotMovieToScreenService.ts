import { Screen } from '../PGmodels/Theatorscreens/Screen.js';
import { MovieScreen } from '../PGmodels/Theatorscreens/MovieScreen.js';
import { CinemaHallMovie } from '../PGmodels/CinemaHall/CinemahallMovie.js';
import { MovieLanguage } from '../PGmodels/Movie/Movielanguage.js';
import { Op } from 'sequelize';

interface payload {
  movieId: Number,
}

class AllotMovieToScreenService {
  async getMovielanguage(cinemaHallId: any, movieInTheatreId: any){
    const movieInTheatre = await CinemaHallMovie.findOne({
      where: {
        CinemahallmovieId: movieInTheatreId,
        cinemaHallId: cinemaHallId,
      },
    });

    if (!movieInTheatre) {
      throw new Error('Movie not found in the specified cinema hall.');
    }

    const movielanguage = await MovieLanguage.findOne({
      where: {
        movieId: movieInTheatre.movieId,
      },
      attributes: ["language"],
    });
    if(!movielanguage){
      throw new Error("no movie lnaguage exist");
    }
    return movielanguage;
  }

  async allotMovieToScreen(
    screenId: any, 
    cinemaHallId: any, 
    movieInTheatreId: any, 
    operatorId: any,  
    movielanguage: any,
    movieopendate:any,
    movieclosedate:any
  ) {
    const screen = await Screen.findOne({
      where: {
        id: screenId,
        cinemaHallId: cinemaHallId,
      },
    });

    if (!screen) {
      throw new Error('Screen not found or does not belong to the specified cinema hall.');
    } 

    screen.screenLanguage = movielanguage;
    await screen.save();

    const conflictingMovieScreen = await MovieScreen.findOne({
      where: {
        screenId: screenId,
        [Op.or]: [
          {
            movieopendate: {
              [Op.between]: [movieopendate, movieclosedate],
            },
          },
          {
            movieclosedate: {
              [Op.between]: [movieopendate, movieclosedate],
            },
          },
          {
            [Op.and]: [
              { movieopendate: { [Op.lte]: movieopendate } },
              { movieclosedate: { [Op.gte]: movieclosedate } },
            ],
          },
        ],
      },
    });
  
    if (conflictingMovieScreen) {
      throw new Error('This screen already has a movie scheduled during the given date range.');
    }

    const movieScreen = await MovieScreen.create({
      screenId: screenId,
      CinemahallmovieId: movieInTheatreId,
      movieopendate: movieopendate,
      movieclosedate: movieclosedate,
    });
    return movieScreen;
  }
}

export { AllotMovieToScreenService };
