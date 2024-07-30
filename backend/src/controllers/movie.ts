import { MovieService } from "../services/MovieService.js";

const movieService = new MovieService();

export const getMoviesByCityId = async(req:any, res:any) => {
    const cityId = req.params.cityId;

  try {
    const movies = await movieService.getMoviesByCityId(cityId);
    res.status(200).json({
      code: "movies/fetch-success",
      message: "Movies fetched successfully",
      data: movies,
    });
  } catch (error) {
    res.status(404).json({
      code: "movies/not-found",
      message: error.message,
    });
  }
}

export const getMoviesByCinemaHallId = async (req: any, res: any) => {
    const cinemaHallId = req.params.cinemaHallId;
  
    try {
      const movies = await movieService.getMoviesByCinemaHallId(cinemaHallId);
      res.status(200).json({
        code: "movies/fetch-success",
        message: "Movies fetched successfully",
        data: movies,
      });
    } catch (error) {
      res.status(404).json({
        code: "movies/not-found",
        message: error.message,
      });
    }
}

export const getMovieDetailById = async(req:any, res:any) => {
    
    const movieId = req.params.movieId;
    try {

      const moviedetail = await movieService.getMovieDetailById(movieId);
      res.status(200).json({
        code: "movies/fetch-success",
        message: "Movies fetched successfully",
        data: moviedetail,
      });

    } catch (error) {
      res.status(404).json({
        code: "movies/not-found",
        message: error.message,
      });
    }

}