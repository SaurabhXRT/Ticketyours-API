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
import dotenv from "dotenv-flow";
dotenv.config();
import logger from "../logger/logger.js";
import { User } from "./User/User.js";
import { City } from "./City/City.js";
import { UserLoginSession } from "./LoginSession/User.Loginsession.js";
import { CinemaOperator } from "./Operator/Operator.js";
import { Movie } from "./Movie/Movie.js";
import { Cast } from "./MovieDetail/Cast.js";
import { MovieCast } from "./Movie/MovieCast.js";
import { Crew } from "./MovieDetail/Crew.js";
import { MovieCrew } from "./Movie/MovieCrew.js";
import { OperatorLoginSession } from "./LoginSession/Operator.Loginsession.js";
import { CinemaHall } from "./CinemaHall/Cinemahall.js";
import { CityCinemaHall } from "./City/CityCinemhalll.js";
import { CityCheck } from "./CityCheck/CityCheck.js";
import { MovieInTheatre } from "./MovieInTheatre/Movieintheatre.js";
import { CinemaHallMovie } from "./CinemaHall/CinemahallMovie.js";
import { CityMovie } from "./City/CityMovie.js";
import { CinemaHallImage } from "./CinemaHall/CinemaHallImage.js";
import { CinemaHallReview } from "./CinemaHallreview/Review.js";
import { Screen } from "./Theatorscreens/Screen.js";
import { MovieScreen } from "./Theatorscreens/MovieScreen.js";
import { TheatreLayout } from "./TheatorLayout/TheatorLayout.js";
import { Showtime } from "./Showtime/Showtime.js";
import { SeatStatus } from "./TheatorSeats/Seats.js";
export function initDatabase(db, dbOptions) {
    return _initDatabase.apply(this, arguments);
}
function _initDatabase() {
    _initDatabase = _async_to_generator(function(db, dbOptions) {
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        db.initInstance(dbOptions)
                    ];
                case 1:
                    _state.sent();
                    return [
                        4,
                        User.sync()
                    ];
                case 2:
                    _state.sent();
                    logger.log("user model initiated successfully");
                    return [
                        4,
                        City.sync()
                    ];
                case 3:
                    _state.sent();
                    logger.log("city model initiated successfully");
                    return [
                        4,
                        UserLoginSession.sync()
                    ];
                case 4:
                    _state.sent();
                    logger.log("loginsession model initiated successfully");
                    return [
                        4,
                        CinemaOperator.sync()
                    ];
                case 5:
                    _state.sent();
                    logger.log("cinemoperator model initiated successfully");
                    return [
                        4,
                        Movie.sync()
                    ];
                case 6:
                    _state.sent();
                    logger.log("movie model initiated successfully");
                    return [
                        4,
                        Cast.sync()
                    ];
                case 7:
                    _state.sent();
                    logger.log("cast model initiated succesfully");
                    return [
                        4,
                        MovieCast.sync()
                    ];
                case 8:
                    _state.sent();
                    logger.log("moviecast model initiated successfully");
                    return [
                        4,
                        Crew.sync()
                    ];
                case 9:
                    _state.sent();
                    logger.log("crew model initiated successfully");
                    return [
                        4,
                        MovieCrew.sync()
                    ];
                case 10:
                    _state.sent();
                    logger.log("moviecrew model initiated successfully");
                    return [
                        4,
                        OperatorLoginSession.sync()
                    ];
                case 11:
                    _state.sent();
                    logger.log("operatorloginsesion created successfully");
                    return [
                        4,
                        CinemaHall.sync()
                    ];
                case 12:
                    _state.sent();
                    logger.log("CinemaHall model initiated successfully");
                    return [
                        4,
                        CityCinemaHall.sync()
                    ];
                case 13:
                    _state.sent();
                    logger.log("CityCinemaHall model initiated successfully");
                    Movie.belongsToMany(Cast, {
                        through: MovieCast,
                        foreignKey: "movieId",
                        as: "casts"
                    });
                    Cast.belongsToMany(Movie, {
                        through: MovieCast,
                        foreignKey: "castId",
                        as: "movies"
                    });
                    Movie.belongsToMany(Crew, {
                        through: MovieCrew,
                        foreignKey: "movieId",
                        as: "crews"
                    });
                    Crew.belongsToMany(Movie, {
                        through: MovieCrew,
                        foreignKey: "crewId",
                        as: "movies"
                    });
                    User.hasMany(UserLoginSession, {
                        foreignKey: "userId",
                        as: "userloginSessions"
                    });
                    UserLoginSession.belongsTo(User, {
                        foreignKey: "userId",
                        as: "user"
                    });
                    CinemaOperator.hasMany(OperatorLoginSession, {
                        foreignKey: "operatorId",
                        as: "operatorloginsessions"
                    });
                    OperatorLoginSession.belongsTo(CinemaOperator, {
                        foreignKey: "operatorId",
                        as: "operator"
                    });
                    City.belongsToMany(CinemaHall, {
                        through: CityCinemaHall,
                        foreignKey: "cityId",
                        as: "cinemaHalls"
                    });
                    CinemaHall.belongsToMany(City, {
                        through: CityCinemaHall,
                        foreignKey: "cinemaHallId",
                        as: "cities"
                    });
                    CityCinemaHall.belongsTo(CinemaHall, {
                        foreignKey: "cinemaHallId",
                        as: "cinemaHall"
                    });
                    CityCinemaHall.belongsTo(City, {
                        foreignKey: "cityId",
                        as: "city"
                    });
                    return [
                        4,
                        CityCheck.sync()
                    ];
                case 14:
                    _state.sent();
                    logger.log("citycheck model initiated successfully");
                    return [
                        4,
                        MovieInTheatre.sync()
                    ];
                case 15:
                    _state.sent();
                    logger.log("movieintheatre model initiated successfullyy");
                    return [
                        4,
                        CityMovie.sync()
                    ];
                case 16:
                    _state.sent();
                    logger.log("citymovie model initiuated successfully");
                    return [
                        4,
                        CinemaHallMovie.sync()
                    ];
                case 17:
                    _state.sent();
                    logger.log("cinemhall movie initiated successfully");
                    MovieInTheatre.belongsTo(Movie, {
                        foreignKey: "movieId",
                        as: "movie"
                    });
                    Movie.hasMany(MovieInTheatre, {
                        foreignKey: "movieId",
                        as: "movieInTheatres"
                    });
                    CinemaHallMovie.belongsTo(CinemaHall, {
                        foreignKey: "cinemaHallId",
                        as: "cinemaHall"
                    });
                    CinemaHallMovie.belongsTo(MovieInTheatre, {
                        foreignKey: "CinemahallmovieId",
                        as: "movieInTheatre"
                    });
                    CinemaHall.hasMany(CinemaHallMovie, {
                        foreignKey: "cinemaHallId",
                        as: "cinemaHallMovies"
                    });
                    MovieInTheatre.hasMany(CinemaHallMovie, {
                        foreignKey: "CinemahallmovieId",
                        as: "cinemaHallMovies"
                    });
                    CityCheck.belongsTo(CinemaHall, {
                        foreignKey: "cinemaHallId",
                        as: "cinemaHall"
                    });
                    CityCheck.belongsTo(Movie, {
                        foreignKey: "movieId",
                        as: "movie"
                    });
                    CityCheck.belongsTo(City, {
                        foreignKey: "cityId",
                        as: "city"
                    });
                    CityMovie.belongsTo(Movie, {
                        foreignKey: "movieId",
                        as: "movie"
                    });
                    CityMovie.belongsTo(City, {
                        foreignKey: "cityId",
                        as: "city"
                    });
                    return [
                        4,
                        CinemaHallImage.sync()
                    ];
                case 18:
                    _state.sent();
                    logger.log("cinemhallimage model created successfully");
                    CinemaHall.hasMany(CinemaHallImage, {
                        foreignKey: "cinemaHallId",
                        as: "images"
                    });
                    CinemaHallImage.belongsTo(CinemaHall, {
                        foreignKey: "cinemaHallId",
                        as: "cinemaHall"
                    });
                    return [
                        4,
                        CinemaHallReview.sync()
                    ];
                case 19:
                    _state.sent();
                    logger.log("cinemhallreview model initiated successfully");
                    CinemaHall.hasMany(CinemaHallReview, {
                        foreignKey: "cinemaHallId",
                        as: "reviews"
                    });
                    CinemaHallReview.belongsTo(CinemaHall, {
                        foreignKey: "cinemaHallId",
                        as: "cinemaHall"
                    });
                    return [
                        4,
                        Screen.sync()
                    ];
                case 20:
                    _state.sent();
                    logger.log("screen model initiated successfully");
                    return [
                        4,
                        MovieScreen.sync()
                    ];
                case 21:
                    _state.sent();
                    logger.log("moviescreen model inityiated successfully");
                    Screen.hasOne(MovieScreen, {
                        foreignKey: "screenId"
                    });
                    MovieScreen.belongsTo(Screen, {
                        foreignKey: "screenId"
                    });
                    MovieInTheatre.hasMany(MovieScreen, {
                        foreignKey: "CinemahallmovieId"
                    });
                    MovieScreen.belongsTo(MovieInTheatre, {
                        foreignKey: "CinemahallmovieId"
                    });
                    return [
                        4,
                        TheatreLayout.sync()
                    ];
                case 22:
                    _state.sent();
                    logger.log("theatrelayout model initiated successfully");
                    TheatreLayout.belongsTo(CinemaHall, {
                        foreignKey: 'cinemaHallId',
                        as: 'cinemaHall'
                    });
                    CinemaHall.hasOne(TheatreLayout, {
                        foreignKey: 'cinemaHallId',
                        as: 'theatreLayouts'
                    });
                    return [
                        4,
                        Showtime.sync()
                    ];
                case 23:
                    _state.sent();
                    logger.log("showtime model has been initialised successfully");
                    return [
                        4,
                        SeatStatus.sync()
                    ];
                case 24:
                    _state.sent();
                    logger.log("seatstatus model has been iniotialized successfully");
                    Showtime.hasMany(SeatStatus, {
                        foreignKey: 'showtimeId',
                        as: 'seatStatuses'
                    });
                    SeatStatus.belongsTo(Showtime, {
                        foreignKey: 'showtimeId',
                        as: 'showtime'
                    });
                    Screen.hasMany(Showtime, {
                        foreignKey: 'screenId',
                        as: 'showtimes'
                    });
                    Showtime.belongsTo(Screen, {
                        foreignKey: 'screenId',
                        as: 'screen'
                    });
                    CinemaHall.hasMany(Showtime, {
                        foreignKey: "cinemaHallId",
                        as: "showtimes"
                    });
                    Showtime.belongsTo(CinemaHall, {
                        foreignKey: "cinemaHallId",
                        as: "cinemhalls"
                    });
                    logger.log("All models and associations have been successfully initiated");
                    return [
                        2
                    ];
            }
        });
    });
    return _initDatabase.apply(this, arguments);
}
