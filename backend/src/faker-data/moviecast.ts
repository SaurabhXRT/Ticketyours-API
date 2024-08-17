import { Movie } from '../PGmodels/Movie/Movie.js';
import { Cast } from '../PGmodels/MovieDetail/Cast.js';
import { MovieCast } from '../PGmodels/Movie/MovieCast.js';

const seedMovieCast = async () => {
  try {
  
    const movies = await Movie.findAll();
    const casts = await Cast.findAll();

    if (movies.length === 0 || casts.length === 0) {
      throw new Error('No movies or cast members found.');
    }

    console.log('Fetched movies:', movies.map(m => ({ id: m.id })));
    console.log('Fetched casts:', casts.map(c => ({ id: c.id })));

   
    for (const movie of movies) {
    
      const shuffledCasts = casts.sort(() => 0.5 - Math.random()).slice(0, 5);

      console.log(`Seeding movieId: ${movie.id} with casts: ${shuffledCasts.map(c => c.id).join(', ')}`);

      const movieCastPromises = shuffledCasts.map(cast => 
        MovieCast.create({
          movieId: movie.id,
          castId: cast.id,
        })
      );

      await Promise.all(movieCastPromises);
    }
    console.log('MovieCast data seeded successfully!');
  } catch (error) {
    console.error('Error seeding MovieCast data:', error);
  }
};

export default seedMovieCast;
