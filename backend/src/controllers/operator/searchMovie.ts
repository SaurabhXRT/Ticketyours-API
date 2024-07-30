import { Request, Response } from 'express';
import { OperatorMovieService } from '../../services/OperatorMovieService.js';

const Service = new OperatorMovieService();

export const searchMoviesByName = async (req: Request, res: Response) => {

  const { name } = req.query;

  if (typeof name !== 'string') {
    return res.status(400).json({
      code: "query/invalid",
      message: "Invalid 'name' query parameter"
    });
  }

  try {
 
    const movies = await Service.searchMoviesByName(name);
    return res.status(200).json(movies);
  } catch (error) {
    console.error(`Error searching for movies by name: ${name}`, error);
    return res.status(500).json({
      code: "server/internal-error",
      message: "An internal server error occurred while searching for movies."
    });
  }
};
