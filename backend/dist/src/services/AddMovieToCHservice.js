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
import { MovieInTheatre } from '../PGmodels/MovieInTheatre/Movieintheatre.js';
import { CinemaHallMovie } from '../PGmodels/CinemaHall/CinemahallMovie.js';
import { CityCheck } from '../PGmodels/CityCheck/CityCheck.js';
import { CityMovie } from '../PGmodels/City/CityMovie.js';
import { Movie } from '../PGmodels/Movie/Movie.js';
import { centralDatabase } from ".././config/dbconfig.js";
export var AddMovieService = /*#__PURE__*/ function() {
    "use strict";
    function AddMovieService() {
        _class_call_check(this, AddMovieService);
    }
    _create_class(AddMovieService, [
        {
            key: "addMovieToCinemaHall",
            value: function addMovieToCinemaHall(operatorId, cinemaHallId, movieId, cityId) {
                return _async_to_generator(function() {
                    var sequelize, transaction, existingEntry, movie, movieInTheatre, cityMovieExists, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                sequelize = centralDatabase.getInstance();
                                return [
                                    4,
                                    sequelize.transaction()
                                ];
                            case 1:
                                transaction = _state.sent();
                                _state.label = 2;
                            case 2:
                                _state.trys.push([
                                    2,
                                    12,
                                    ,
                                    14
                                ]);
                                return [
                                    4,
                                    MovieInTheatre.findOne({
                                        where: {
                                            movieId: movieId
                                        }
                                    })
                                ];
                            case 3:
                                existingEntry = _state.sent();
                                if (existingEntry) {
                                    return [
                                        2,
                                        "This movie is already in your cinema hall"
                                    ];
                                }
                                return [
                                    4,
                                    Movie.findByPk(movieId)
                                ];
                            case 4:
                                movie = _state.sent();
                                if (!movie) {
                                    return [
                                        2,
                                        "Movie not found"
                                    ];
                                }
                                return [
                                    4,
                                    MovieInTheatre.create({
                                        movieId: movie.id,
                                        title: movie.title,
                                        description: movie.description,
                                        genre: movie.genre,
                                        duration: movie.duration,
                                        releaseDate: movie.releaseDate,
                                        posterUrl: movie.posterUrl
                                    }, {
                                        transaction: transaction
                                    })
                                ];
                            case 5:
                                movieInTheatre = _state.sent();
                                return [
                                    4,
                                    CinemaHallMovie.create({
                                        cinemaHallId: cinemaHallId,
                                        CinemahallmovieId: movieInTheatre.id
                                    }, {
                                        transaction: transaction
                                    })
                                ];
                            case 6:
                                _state.sent();
                                return [
                                    4,
                                    CityCheck.create({
                                        movieId: movieId,
                                        cinemaHallId: cinemaHallId,
                                        cityId: cityId
                                    }, {
                                        transaction: transaction
                                    })
                                ];
                            case 7:
                                _state.sent();
                                return [
                                    4,
                                    CityMovie.findOne({
                                        where: {
                                            cityId: cityId,
                                            movieId: movieId
                                        },
                                        transaction: transaction
                                    })
                                ];
                            case 8:
                                cityMovieExists = _state.sent();
                                if (!!cityMovieExists) return [
                                    3,
                                    10
                                ];
                                return [
                                    4,
                                    CityMovie.create({
                                        cityId: cityId,
                                        movieId: movieId
                                    }, {
                                        transaction: transaction
                                    })
                                ];
                            case 9:
                                _state.sent();
                                _state.label = 10;
                            case 10:
                                return [
                                    4,
                                    transaction.commit()
                                ];
                            case 11:
                                _state.sent();
                                return [
                                    2,
                                    movieInTheatre
                                ];
                            case 12:
                                error = _state.sent();
                                return [
                                    4,
                                    transaction.rollback()
                                ];
                            case 13:
                                _state.sent();
                                console.error("Error adding movie to cinema hall:", error);
                                throw new Error("Failed to add movie to cinema hall");
                            case 14:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        }
    ]);
    return AddMovieService;
}();
