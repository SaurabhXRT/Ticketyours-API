import { Movie } from "../PGmodels/Movie/Movie.js";  
import { Op } from 'sequelize';
export class OperatorMovieService {
  async searchMoviesByName(title: string) {
    try {
      const movies = await Movie.findAll({
        where: {
          title: {
            [Op.iLike]: `%${title}%` 
          }
        }
      });
      return movies;
    } catch (error) {
      console.error(`Error searching movies by name ${title}:`, error);
      throw new Error(`Failed to search movies by name ${title}`);
    }
  }
}
