import Movie from "../models/Movies.js";  

export class OperatorMovieService {
  async searchMoviesByName(title: string) {
    try {
    
      const movies = await Movie.find({
        title: { $regex: new RegExp(title, 'i') }  
      });
      return movies;
    } catch (error) {
      console.error(`Error searching movies by name ${title}:`, error);
      throw new Error(`Failed to search movies by name ${title}`);
    }
  }
}
