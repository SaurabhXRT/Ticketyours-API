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
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
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
import { CinemaHallMovie } from "../PGmodels/CinemaHall/CinemahallMovie.js";
import { CityMovie } from "../PGmodels/City/CityMovie.js";
import { Movie } from '../PGmodels/Movie/Movie.js';
import { Crew } from '../PGmodels/MovieDetail/Crew.js';
import { Cast } from '../PGmodels/MovieDetail/Cast.js';
import { MovieInTheatre } from "../PGmodels/MovieInTheatre/Movieintheatre.js";
export var MovieService = /*#__PURE__*/ function() {
    "use strict";
    function MovieService() {
        _class_call_check(this, MovieService);
    }
    _create_class(MovieService, [
        {
            key: "getMoviesByCityId",
            value: function getMoviesByCityId(cityId) {
                return _async_to_generator(function() {
                    var cityMovies, movies, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                return [
                                    4,
                                    CityMovie.findAll({
                                        where: {
                                            cityId: cityId
                                        },
                                        include: [
                                            {
                                                model: Movie,
                                                as: 'movie',
                                                attributes: [
                                                    'title',
                                                    'posterUrl',
                                                    'genre',
                                                    'releaseDate',
                                                    'duration',
                                                    'description'
                                                ]
                                            }
                                        ]
                                    })
                                ];
                            case 1:
                                cityMovies = _state.sent();
                                if (!cityMovies || cityMovies.length === 0) {
                                    return [
                                        2,
                                        "No movies found for this city"
                                    ];
                                }
                                movies = cityMovies.map(function(cityMovie) {
                                    return cityMovie.movie;
                                });
                                return [
                                    2,
                                    movies
                                ];
                            case 2:
                                error = _state.sent();
                                console.error("Error fetching movies for city ".concat(cityId, ":"), error);
                                throw new Error("Failed to fetch movies for city ".concat(cityId));
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "getMoviesByCinemaHallId",
            value: function getMoviesByCinemaHallId(cinemaHallId) {
                return _async_to_generator(function() {
                    var moviesInCinemaHall, movies, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                return [
                                    4,
                                    CinemaHallMovie.findAll({
                                        where: {
                                            cinemaHallId: cinemaHallId
                                        },
                                        include: [
                                            {
                                                model: MovieInTheatre,
                                                as: "movieInTheatre",
                                                attributes: [
                                                    'title',
                                                    'posterUrl',
                                                    'genre',
                                                    'releaseDate',
                                                    'duration',
                                                    'description'
                                                ]
                                            }
                                        ]
                                    })
                                ];
                            case 1:
                                moviesInCinemaHall = _state.sent();
                                if (!moviesInCinemaHall || moviesInCinemaHall.length === 0) {
                                    return [
                                        2,
                                        null
                                    ];
                                }
                                movies = moviesInCinemaHall.map(function(chm) {
                                    return chm.movieInTheatre;
                                });
                                return [
                                    2,
                                    movies
                                ];
                            case 2:
                                error = _state.sent();
                                console.error("Error fetching movies for cinema hall ".concat(cinemaHallId, ":"), error);
                                throw new Error("Failed to fetch movies for cinema hall ".concat(cinemaHallId));
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "getMovieDetailById",
            value: function getMovieDetailById(movieId) {
                return _async_to_generator(function() {
                    var movie, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                return [
                                    4,
                                    Movie.findByPk(movieId, {
                                        include: [
                                            {
                                                model: Cast,
                                                through: {
                                                    attributes: []
                                                },
                                                as: 'casts'
                                            },
                                            {
                                                model: Crew,
                                                through: {
                                                    attributes: []
                                                },
                                                as: 'crews'
                                            }
                                        ]
                                    })
                                ];
                            case 1:
                                movie = _state.sent();
                                if (!movie) {
                                    throw new Error('Movie does not exist');
                                }
                                // Convert the movie instance to a JSON object
                                return [
                                    2,
                                    movie.toJSON()
                                ];
                            case 2:
                                error = _state.sent();
                                console.error("Error fetching movie details:", error);
                                throw new Error("Failed to fetch movie details");
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        }
    ]);
    return MovieService;
}();
