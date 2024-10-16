import { CinemaHallService } from "../services/CinemahallService.js";
import { redisGetAsync, redisSetAsync } from "../redis/redis.js";

const cinemaHallService = new CinemaHallService();

export const getCinemaHalls = async(req:any , res: any) =>{
// #swagger.description = 'get all the cinemhall in a city using cityid'
    const cityId = req.params.cityId;
    //const cachekey = `cinemaHalls:${cityId}`;

    try {
      // const cachedData = await redisGetAsync(cachekey);
      // if(cachedData){
      //   const cinemaHalls = JSON.parse(cachedData);
      //   res.status(200).json({
      //     code: "cinemahalls/fetch-success",
      //     message: "Cinema halls fetched successfully",
      //     data: cinemaHalls,
      //   });
      // }
     
      const cinemaHalls = await cinemaHallService.getCinemaHallsByCityId(cityId);
      //await redisSetAsync(cachekey, JSON.stringify(cinemaHalls), 'EX', 3600);

      res.status(200).json({
        code: "cinemahalls/fetch-success",
        message: "Cinema halls fetched successfully",
        data: cinemaHalls,
      });

    } catch (error) {
      res.status(404).json({
        code: "cinemahalls/not-found",
        message: error.message,
      });
    }

  
}

export const getCinemaHallsByCityAndMovie = async (req: any, res: any) => {
  // #swagger.description = 'get all the cinemhall in which a particular movie is running using cityid and movieid '
    const cityId = req.params.cityId;
    const movieId = req.params.movieId;
  
    try {
      const cinemaHalls = await cinemaHallService.getCinemaHallsByCityIdAndMovieId(cityId, movieId);
      if(cinemaHalls === "No cinema halls found for this movie in the specified city"){
        res.status(404).send({
          code: "cinemahalls/not-found",
          message: "No cinema halls found for this movie in the specified city"
        });
        return;
      }
      res.status(200).json({
        code: "cinemahalls/fetch-success",
        message: "Cinema halls for the movie fetched successfully",
        data: cinemaHalls,
      });
    } catch (error) {
      res.status(404).json({
        code: "cinemahalls/not-found",
        message: error.message,
      });
    }
}