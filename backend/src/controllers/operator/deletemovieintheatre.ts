import { Request, Response } from 'express';
import { DeleteMovieService } from '../../services/Operator.deletemovieservice.js';

const service = new DeleteMovieService();

export const deleteMovieFromCinemaHall = async (req: Request, res: Response) => {
    // #swagger.description = 'delete the adedd movie in a cinemahall'
  const { movieInTheatreId, cinemaHallId, cityId } = req.body;

  if (!movieInTheatreId || !cinemaHallId || !cityId) {
    return res.status(400).json({
      code: 'fields/empty',
      message: 'All fields (movieInTheatreId, cinemaHallId, cityId) are required',
    });
  }

  try {
    const result = await service.deleteMovie(movieInTheatreId, cinemaHallId, cityId);
    if(result === "MovieInTheatre not found"){
        res.status(404).send({
            code: "movieintheatre/not-found",
            message: "MovieInTheatre not found"
        });
        return;
    }
    

    res.status(200).json({
      code: 'movie/deleted',
      message: "Movie removed from cinema hall successfully",
    });
  } catch (error) {
    console.error('Error deleting movie from cinema hall:', error);
    res.status(500).json({
      code: 'server/internal-error',
      message: 'An internal server error occurred while deleting the movie from the cinema hall.',
    });
  }
};
