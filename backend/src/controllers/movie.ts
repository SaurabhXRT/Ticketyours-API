import { MovieService } from "../services/MovieService.js";

const movieService = new MovieService();

export const getMoviesByCityId = async(req:any, res:any) => {
// #swagger.description = 'get all the movie which is available to watch in a city using cityid'
    const cityId = req.params.cityId;

  try {
    const movies = await movieService.getMoviesByCityId(cityId);

    if(movies === "No movies found for this city"){
      res.status(404).send({
        code: "movies/not-found",
        message: "No movies found for this city",
      });
      return;
    }

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
  // #swagger.description = 'get all the movies running in a cinemhall using cinemhallid'
    const cinemaHallId = req.params.cinemaHallId;
  
    try {
      const movies = await movieService.getMoviesByCinemaHallId(cinemaHallId);
      if(movies === null){
        res.status(404).send({
          code: "movies/not-found",
          message: "no movies in this cinemhall"
        });
        return;
      }
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
    // #swagger.description = 'gte the moviedetails using movieid'
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