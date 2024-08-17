import { Screen } from '../PGmodels/Theatorscreens/Screen.js';
import { MovieScreen } from '../PGmodels/Theatorscreens/MovieScreen.js';
import { CinemaHallMovie } from '../PGmodels/CinemaHall/CinemahallMovie.js';

class AllotMovieToScreenService {

  async allotMovieToScreen(screenId: any, cinemaHallId: any, movieInTheatreId: any, operatorId: any) {
    const screen = await Screen.findOne({
      where: {
        id: screenId,
        cinemaHallId: cinemaHallId,
      },
    });

    if (!screen) {
      throw new Error('Screen not found or does not belong to the specified cinema hall.');
    }

    const movieInTheatre = await CinemaHallMovie.findOne({
      where: {
        CinemahallmovieId: movieInTheatreId,
        cinemaHallId: cinemaHallId,
      },
    });

    if (!movieInTheatre) {
      throw new Error('Movie not found in the specified cinema hall.');
    }

    const existingMovieScreen = await MovieScreen.findOne({
      where: {
        screenId: screenId,
      },
    });

    if (existingMovieScreen) {
      throw new Error('This screen is already assigned a movie.');
    }

    const movieScreen = await MovieScreen.create({
      screenId: screenId,
      CinemahallmovieId: movieInTheatreId,
    });

    return movieScreen;
  }
}

export { AllotMovieToScreenService };
