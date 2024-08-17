import { Movie } from '../PGmodels/Movie/Movie.js';
import { Crew } from '../PGmodels/MovieDetail/Crew.js';
import { MovieCrew } from '../PGmodels/Movie/MovieCrew.js';

const seedMovieCrew = async () => {
  try {
  
    const movies = await Movie.findAll();
    const crews = await Crew.findAll();

    if (movies.length === 0 || crews.length === 0) {
      throw new Error('No movies or cast members found.');
    }

    console.log('Fetched movies:', movies.map(m => ({ id: m.id })));
    console.log('Fetched casts:', crews.map(c => ({ id: c.id })));

   
    for (const movie of movies) {
    
      const shuffledCrews = crews.sort(() => 0.5 - Math.random()).slice(0, 5);

      console.log(`Seeding movieId: ${movie.id} with casts: ${shuffledCrews.map(c => c.id).join(', ')}`);

      const movieCrewPromises = shuffledCrews.map(crew => 
        MovieCrew.create({
          movieId: movie.id,
          crewId: crew.id,
        })
      );

      await Promise.all(movieCrewPromises);
    }
    console.log('MovieCrew data seeded successfully!');
  } catch (error) {
    console.error('Error seeding MovieCrew data:', error);
  }
};

export default seedMovieCrew;
