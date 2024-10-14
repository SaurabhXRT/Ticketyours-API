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
import { MovieInTheatre } from "../PGmodels/MovieInTheatre/Movieintheatre.js";
import { CityCheck } from "../PGmodels/CityCheck/CityCheck.js";
import { CityMovie } from "../PGmodels/City/CityMovie.js";
export var DeleteMovieService = /*#__PURE__*/ function() {
    "use strict";
    function DeleteMovieService() {
        _class_call_check(this, DeleteMovieService);
    }
    _create_class(DeleteMovieService, [
        {
            key: "deleteMovie",
            value: function deleteMovie(movieInTheatreId, cinemaHallId, cityId) {
                return _async_to_generator(function() {
                    var transaction, movieInTheatre, movieId, movieintheatrestatus, movieInCityExists, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    MovieInTheatre.sequelize.transaction()
                                ];
                            case 1:
                                transaction = _state.sent();
                                _state.label = 2;
                            case 2:
                                _state.trys.push([
                                    2,
                                    11,
                                    ,
                                    13
                                ]);
                                return [
                                    4,
                                    MovieInTheatre.findOne({
                                        where: {
                                            id: movieInTheatreId
                                        },
                                        transaction: transaction
                                    })
                                ];
                            case 3:
                                movieInTheatre = _state.sent();
                                if (!movieInTheatre) {
                                    return [
                                        2,
                                        "MovieInTheatre not found"
                                    ];
                                }
                                movieId = movieInTheatre.movieId;
                                return [
                                    4,
                                    MovieInTheatre.findOne({
                                        where: {
                                            id: movieInTheatreId
                                        },
                                        transaction: transaction
                                    })
                                ];
                            case 4:
                                movieintheatrestatus = _state.sent();
                                return [
                                    4,
                                    movieintheatrestatus.update({
                                        runningStatus: "completed"
                                    }, {
                                        transaction: transaction
                                    })
                                ];
                            case 5:
                                _state.sent();
                                // await CinemaHallMovie.destroy({
                                //   where: { cinemaHallId, CinemahallmovieId: movieInTheatreId },
                                //   transaction,
                                // });
                                return [
                                    4,
                                    CityCheck.destroy({
                                        where: {
                                            movieId: movieId,
                                            cinemaHallId: cinemaHallId,
                                            cityId: cityId
                                        },
                                        transaction: transaction
                                    })
                                ];
                            case 6:
                                _state.sent();
                                return [
                                    4,
                                    CityCheck.findOne({
                                        where: {
                                            movieId: movieId,
                                            cityId: cityId
                                        },
                                        transaction: transaction
                                    })
                                ];
                            case 7:
                                movieInCityExists = _state.sent();
                                if (!!movieInCityExists) return [
                                    3,
                                    9
                                ];
                                return [
                                    4,
                                    CityMovie.destroy({
                                        where: {
                                            cityId: cityId,
                                            movieId: movieId
                                        },
                                        transaction: transaction
                                    })
                                ];
                            case 8:
                                _state.sent();
                                _state.label = 9;
                            case 9:
                                return [
                                    4,
                                    transaction.commit()
                                ];
                            case 10:
                                _state.sent();
                                return [
                                    2,
                                    {
                                        success: true,
                                        message: "Movie removed from cinema hall successfully"
                                    }
                                ];
                            case 11:
                                error = _state.sent();
                                return [
                                    4,
                                    transaction.rollback()
                                ];
                            case 12:
                                _state.sent();
                                console.error("Error removing movie from cinema hall:", error);
                                throw new Error("Failed to remove movie from cinema hall");
                            case 13:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        }
    ]);
    return DeleteMovieService;
}();
