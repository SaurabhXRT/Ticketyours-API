function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
import { Movie } from '../PGmodels/Movie/Movie.js';
var moviesData = [
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
var seedMovies = function() {
    var _ref = _async_to_generator(function() {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, movie, err, err1;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    _state.trys.push([
                        0,
                        9,
                        ,
                        10
                    ]);
                    _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        6,
                        7,
                        8
                    ]);
                    _iterator = moviesData[Symbol.iterator]();
                    _state.label = 2;
                case 2:
                    if (!!(_iteratorNormalCompletion = (_step = _iterator.next()).done)) return [
                        3,
                        5
                    ];
                    movie = _step.value;
                    return [
                        4,
                        Movie.create({
                            title: movie.title,
                            description: movie.description,
                            genre: movie.genre,
                            duration: movie.duration,
                            releaseDate: movie.release_date,
                            posterUrl: movie.poster_url
                        })
                    ];
                case 3:
                    _state.sent();
                    _state.label = 4;
                case 4:
                    _iteratorNormalCompletion = true;
                    return [
                        3,
                        2
                    ];
                case 5:
                    return [
                        3,
                        8
                    ];
                case 6:
                    err = _state.sent();
                    _didIteratorError = true;
                    _iteratorError = err;
                    return [
                        3,
                        8
                    ];
                case 7:
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                    return [
                        7
                    ];
                case 8:
                    console.log('Database seeded with movies!');
                    return [
                        3,
                        10
                    ];
                case 9:
                    err1 = _state.sent();
                    console.error('Error seeding movies:', err1.message);
                    process.exit(1);
                    return [
                        3,
                        10
                    ];
                case 10:
                    return [
                        2
                    ];
            }
        });
    });
    return function seedMovies() {
        return _ref.apply(this, arguments);
    };
}();
export default seedMovies;
