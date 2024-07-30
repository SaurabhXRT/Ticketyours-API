import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import Movie from '../models/Movies.js';  


const moviesData = [
    {
        title: "The Shawshank Redemption",
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        genre: "Drama",
        duration: 142,
        release_date: "1994-09-22",
        end_date: "1994-09-22",
        poster_url: "https://images-na.ssl-images-amazon.com/images/M/MV5BMDFkYTc0MGEtZmYyYS00ZTIyLWIxNWEtYjdmYzBhZDIxYjI4XkEyXkFqcGdeQXVyNjUwNzY5NTk@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
        created_at: "2024-07-25T00:00:00.000Z",
        updated_at: "2024-07-25T00:00:00.000Z"
    },
    {
        title: "Pulp Fiction",
        description: "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        genre: "Crime, Drama",
        duration: 154,
        release_date: "1994-10-14",
        end_date: "1994-10-14",
        poster_url: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTk2NTgyNjc4Ml5BMl5BanBnXkFtZTcwNTAxNzY1Mw@@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
        created_at: "2024-07-25T00:00:00.000Z",
        updated_at: "2024-07-25T00:00:00.000Z"
    },
    {
        title: "Forrest Gump",
        description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
        genre: "Drama, Romance",
        duration: 142,
        release_date: "1994-07-06",
        end_date: "1994-07-06",
        poster_url: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTkzOTUyNzE5OF5BMl5BanBnXkFtZTcwNTMwNjU4MQ@@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
        created_at: "2024-07-25T00:00:00.000Z",
        updated_at: "2024-07-25T00:00:00.000Z"
    },
    {
        title: "Gladiator",
        description: "When a Roman general is betrayed and his family murdered by the corrupt son of the Emperor, he comes to Rome as a gladiator to seek revenge.",
        genre: "Action, Adventure, Drama",
        duration: 155,
        release_date: "2000-05-05",
        end_date: "2000-05-05",
        poster_url: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTY3NjY5NzQ4MV5BMl5BanBnXkFtZTcwNDMxNzU2MQ@@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
        created_at: "2024-07-25T00:00:00.000Z",
        updated_at: "2024-07-25T00:00:00.000Z"
    },
    {
        title: "The Godfather",
        description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        genre: "Crime, Drama",
        duration: 175,
        release_date: "1972-03-24",
        end_date: "1972-03-24",
        poster_url: "https://images-na.ssl-images-amazon.com/images/M/MV5BM2MyNjUwN2UtYjcyMy00ZTlhLTg5MzYtNjJkNzNhMGU0YjMxXkEyXkFqcGdeQXVyNjUwNzY5NTk@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
        created_at: "2024-07-25T00:00:00.000Z",
        updated_at: "2024-07-25T00:00:00.000Z"
    },
    {
        title: "The Lord of the Rings: The Fellowship of the Ring",
        description: "A young hobbit, Frodo Baggins, is thrust into an epic quest to destroy the One Ring and save Middle-Earth from the Dark Lord Sauron.",
        genre: "Action, Adventure, Drama",
        duration: 178,
        release_date: "2001-12-19",
        end_date: "2001-12-19",
        poster_url: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTYzNTU1MTYyOV5BMl5BanBnXkFtZTcwMzc0NzMyMQ@@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
        created_at: "2024-07-25T00:00:00.000Z",
        updated_at: "2024-07-25T00:00:00.000Z"
    },
    {
        title: "Star Wars: Episode IV - A New Hope",
        description: "Luke Skywalker, a young farm boy, becomes embroiled in the Galactic Civil War when he discovers that his destiny is to become a Jedi Knight and help the Rebel Alliance defeat the evil Galactic Empire.",
        genre: "Action, Adventure, Fantasy",
        duration: 121,
        release_date: "1977-05-25",
        end_date: "1977-05-25",
        poster_url: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjA3MzA4MDg4M15BMl5BanBnXkFtZTcwNDM0Mzc2MQ@@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
        created_at: "2024-07-25T00:00:00.000Z",
        updated_at: "2024-07-25T00:00:00.000Z"
    },
    {
        title: "The Silence of the Lambs",
        description: "A young FBI cadet must confide in an incarcerated and manipulative killer to receive his help on catching another serial killer who skins his victims.",
        genre: "Crime, Drama, Thriller",
        duration: 118,
        release_date: "1991-02-14",
        end_date: "1991-02-14",
        poster_url: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjExMjE3Njk1MV5BMl5BanBnXkFtZTgwMzc2MjEyNTE@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
        created_at: "2024-07-25T00:00:00.000Z",
        updated_at: "2024-07-25T00:00:00.000Z"
    },
    {
        title: "Jurassic Park",
        description: "During a preview tour, a theme park suffers a major power breakdown that allows its cloned dinosaur exhibits to run amok.",
        genre: "Adventure, Sci-Fi, Thriller",
        duration: 127,
        release_date: "1993-06-11",
        end_date: "1993-06-11",
        poster_url: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTYyNTgyNDU0Ml5BMl5BanBnXkFtZTcwNTMwMjU0NA@@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
        created_at: "2024-07-25T00:00:00.000Z",
        updated_at: "2024-07-25T00:00:00.000Z"
    },
    {
        title: "Avatar",
        description: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
        genre: "Action, Adventure, Sci-Fi",
        duration: 162,
        release_date: "2009-12-18",
        end_date: "2009-12-18",
        poster_url: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjEyNjY4NzA1MF5BMl5BanBnXkFtZTcwNzI0NTI1Mw@@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
        created_at: "2024-07-25T00:00:00.000Z",
        updated_at: "2024-07-25T00:00:00.000Z"
    },
    {
        title: "Inception",
        description: "A thief who enters the dreams of others to steal secrets from their subconscious is given the inverse task of planting an idea into the mind of a CEO.",
        genre: "Action, Adventure, Sci-Fi",
        duration: 148,
        release_date: "2010-07-16",
        end_date: "2010-07-16",
        poster_url: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTU0MTU4MzU4MV5BMl5BanBnXkFtZTcwNTc1NjYxMw@@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
        created_at: "2024-07-25T00:00:00.000Z",
        updated_at: "2024-07-25T00:00:00.000Z"
    },
    {
        title: "The Matrix",
        description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        genre: "Action, Sci-Fi",
        duration: 136,
        release_date: "1999-03-31",
        end_date: "1999-03-31",
        poster_url: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjAwMjAwMzAyMV5BMl5BanBnXkFtZTcwNTk1NzA2MQ@@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
        created_at: "2024-07-25T00:00:00.000Z",
        updated_at: "2024-07-25T00:00:00.000Z"
    },
    {
        title: "The Dark Knight",
        description: "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham, forcing Batman to relinquish his rule as the city's protector while he sets out to stop the criminal mastermind.",
        genre: "Action, Crime, Drama",
        duration: 152,
        release_date: "2008-07-18",
        end_date: "2008-07-18",
        poster_url: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTM2MjEzMjI4MF5BMl5BanBnXkFtZTcwMzMzNjEyMQ@@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
        created_at: "2024-07-25T00:00:00.000Z",
        updated_at: "2024-07-25T00:00:00.000Z"
    },
    {
        title: "The Departed",
        description: "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in Boston.",
        genre: "Crime, Drama, Thriller",
        duration: 151,
        release_date: "2006-10-06",
        end_date: "2006-10-06",
        poster_url: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjA1MjI4NzUyNF5BMl5BanBnXkFtZTcwNTkxNzEyMQ@@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
        created_at: "2024-07-25T00:00:00.000Z",
        updated_at: "2024-07-25T00:00:00.000Z"
    },
    {
        title: "Fight Club",
        description: "An insomniac office worker and a soap salesman build a global organization to help vent male aggression.",
        genre: "Drama",
        duration: 139,
        release_date: "1999-10-15",
        end_date: "1999-10-15",
        poster_url: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTk1NjUxMzI3M15BMl5BanBnXkFtZTgwNjA1NTE2MQ@@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
        created_at: "2024-07-25T00:00:00.000Z",
        updated_at: "2024-07-25T00:00:00.000Z"
    },
    {
        title: "The Usual Suspects",
        description: "A sole survivor tells a horrific story of the last four days of a deadly con-man and his gang of criminals.",
        genre: "Crime, Drama, Thriller",
        duration: 106,
        release_date: "1995-08-16",
        end_date: "1995-08-16",
        poster_url: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTYyODgyMTM2NF5BMl5BanBnXkFtZTcwNzE3NjEyMQ@@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
        created_at: "2024-07-25T00:00:00.000Z",
        updated_at: "2024-07-25T00:00:00.000Z"
    },
    {
        title: "Se7en",
        description: "Two detectives hunt a serial killer who justifies his crimes as absolution for the world's seven deadly sins.",
        genre: "Crime, Drama, Mystery",
        duration: 127,
        release_date: "1995-09-22",
        end_date: "1995-09-22",
        poster_url: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTk2NTI5MzM2OF5BMl5BanBnXkFtZTgwNDE5NzEyMQ@@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
        created_at: "2024-07-25T00:00:00.000Z",
        updated_at: "2024-07-25T00:00:00.000Z"
    }
];


const seedMovies = async (): Promise<void> => {
   
    try {
        await Movie.deleteMany({});

        for (const movie of moviesData) {
            const newMovie = new Movie({
                title: movie.title,
                description: movie.description,
                genre: movie.genre,
                duration: movie.duration,
                release_date: movie.release_date,
                end_date: movie.release_date, 
                poster_url: movie.poster_url,
                created_at: new Date(),
                updated_at: new Date(),
            });
            await newMovie.save();
        }

        console.log('Database seeded with movies!');
    } catch (err) {
        console.error('Error seeding movies:', err.message);
        process.exit(1); 
    }
};


export default seedMovies;
