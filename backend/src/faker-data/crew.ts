import { Crew } from '../PGmodels/MovieDetail/Crew.js';

const crewData = [
    {
        name: "Leonardo DiCaprio",
        imageUrl: "https://example.com/leonardo.jpg",
    },
    {
        name: "Morgan Freeman",
        imageUrl: "https://example.com/morgan.jpg",
    },
    {
        name: "Tom Hanks",
        imageUrl: "https://example.com/tom.jpg",
    },
    {
        name: "Julia Roberts",
        imageUrl: "https://example.com/julia.jpg",
    },
    {
        name: "Brad Pitt",
        imageUrl: "https://example.com/brad.jpg",
    },
    {
        name: "Angelina Jolie",
        imageUrl: "https://example.com/angelina.jpg",
    },
    {
        name: "Robert Downey Jr.",
        imageUrl: "https://example.com/robert.jpg",
    },
    {
        name: "Scarlett Johansson",
        imageUrl: "https://example.com/scarlett.jpg",
    },
    {
        name: "Will Smith",
        imageUrl: "https://example.com/will.jpg",
    },
    {
        name: "Jennifer Lawrence",
        imageUrl: "https://example.com/jennifer.jpg",
    }
];

const seedCrew = async () => {
    try {
        
        for (const cast of crewData) {
            await Crew.create({
                name: cast.name,
                imageUrl: cast.imageUrl,
            });
        }

        console.log('Database seeded with crew!');
    } catch (err) {
        console.error('Error seeding crew:', err.message);
        process.exit(1);
    }
};

export default seedCrew;
