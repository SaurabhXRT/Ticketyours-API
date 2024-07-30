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
import MovieInCinemaHall from "../models/Moviemodel.js";
import CinemaHall from "../models/cinema_hall/CinemaHall.js";
import { MovieService } from "./MovieService.js";
import CityModel from "../models/city/City.model.js";
export var AddMovieService = /*#__PURE__*/ function() {
    "use strict";
    function AddMovieService() {
        _class_call_check(this, AddMovieService);
    }
    _create_class(AddMovieService, [
        {
            key: "addMovieToCinemaHall",
            value: function addMovieToCinemaHall(operatorId, cinemaHallId, movieId) {
                var _this = this;
                return _async_to_generator(function() {
                    var session, cinemaHall, service, movieData, newMovieInCinemaHall, city, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    MovieInCinemaHall.startSession()
                                ];
                            case 1:
                                session = _state.sent();
                                session.startTransaction();
                                _state.label = 2;
                            case 2:
                                _state.trys.push([
                                    2,
                                    10,
                                    12,
                                    13
                                ]);
                                return [
                                    4,
                                    CinemaHall.findOne({
                                        _id: cinemaHallId,
                                        operator_id: operatorId
                                    }).session(session)
                                ];
                            case 3:
                                cinemaHall = _state.sent();
                                if (!cinemaHall) {
                                    throw new Error("Cinema hall not found or does not belong to the operator");
                                }
                                service = new MovieService();
                                return [
                                    4,
                                    service.getMovieDetailById(movieId)
                                ];
                            case 4:
                                movieData = _state.sent();
                                return [
                                    4,
                                    MovieInCinemaHall.create([
                                        {
                                            movie_id: movieId,
                                            cinema_hall_id: cinemaHallId,
                                            title: movieData.title,
                                            description: movieData.description,
                                            genre: movieData.genre,
                                            duration: movieData.duration,
                                            release_date: movieData.release_date,
                                            end_date: movieData.end_date,
                                            poster_url: movieData.poster_url,
                                            created_at: new Date(),
                                            updated_at: new Date()
                                        }
                                    ], {
                                        session: session
                                    })
                                ];
                            case 5:
                                newMovieInCinemaHall = _state.sent();
                                return [
                                    4,
                                    CinemaHall.findByIdAndUpdate(cinemaHallId, {
                                        $push: {
                                            movies: newMovieInCinemaHall[0]._id
                                        }
                                    }, {
                                        new: true,
                                        session: session
                                    })
                                ];
                            case 6:
                                _state.sent();
                                return [
                                    4,
                                    CityModel.findOne({
                                        _id: cinemaHall.city_id
                                    }).session(session)
                                ];
                            case 7:
                                city = _state.sent();
                                if (!city) {
                                    throw new Error("City not found for the given cinema hall");
                                }
                                return [
                                    4,
                                    _this.updateCityMovies(city._id, newMovieInCinemaHall[0]._id, session)
                                ];
                            case 8:
                                _state.sent();
                                return [
                                    4,
                                    session.commitTransaction()
                                ];
                            case 9:
                                _state.sent();
                                return [
                                    2,
                                    cinemaHall.toJSON()
                                ];
                            case 10:
                                error = _state.sent();
                                return [
                                    4,
                                    session.abortTransaction()
                                ];
                            case 11:
                                _state.sent();
                                console.error("Error adding movie to cinema hall:", error);
                                throw new Error("Failed to add movie to cinema hall");
                            case 12:
                                session.endSession();
                                return [
                                    7
                                ];
                            case 13:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "updateCityMovies",
            value: // Helper function to check and update CityModel
            function updateCityMovies(cityId, movieId, session) {
                return _async_to_generator(function() {
                    var city, movieAlreadyInCity;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    CityModel.findById(cityId).session(session)
                                ];
                            case 1:
                                city = _state.sent();
                                if (!city) {
                                    throw new Error("City not found");
                                }
                                movieAlreadyInCity = city.cinemaMovies.includes(movieId);
                                if (!!movieAlreadyInCity) return [
                                    3,
                                    3
                                ];
                                return [
                                    4,
                                    CityModel.findByIdAndUpdate(cityId, {
                                        $push: {
                                            cinemaMovies: movieId
                                        }
                                    }, {
                                        new: true,
                                        session: session
                                    })
                                ];
                            case 2:
                                _state.sent();
                                _state.label = 3;
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
    return AddMovieService;
}();
