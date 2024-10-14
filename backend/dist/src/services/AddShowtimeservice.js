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
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
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
import { Showtime } from "../PGmodels/Showtime/Showtime.js";
import { Screen } from "../PGmodels/Theatorscreens/Screen.js";
import { MovieInTheatre } from "../PGmodels/MovieInTheatre/Movieintheatre.js";
import { MovieScreen } from "../PGmodels/Theatorscreens/MovieScreen.js";
import { Op } from "sequelize";
export var ShowtimeService = /*#__PURE__*/ function() {
    "use strict";
    function ShowtimeService() {
        _class_call_check(this, ShowtimeService);
    }
    _create_class(ShowtimeService, [
        {
            key: "createShowtime",
            value: function createShowtime(data) {
                return _async_to_generator(function() {
                    var movieInTheatreId, screenId, cinemaHallId, startTime, endTime, showTimeDate, screen, movieInTheatre, movieId, movieScreen, existingShowtime, newShowtime, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                movieInTheatreId = data.movieInTheatreId, screenId = data.screenId, cinemaHallId = data.cinemaHallId, startTime = data.startTime, endTime = data.endTime, showTimeDate = data.showTimeDate;
                                _state.label = 1;
                            case 1:
                                _state.trys.push([
                                    1,
                                    7,
                                    ,
                                    8
                                ]);
                                return [
                                    4,
                                    Screen.findByPk(screenId)
                                ];
                            case 2:
                                screen = _state.sent();
                                if (!screen) {
                                    throw new Error("Screen not found.");
                                }
                                return [
                                    4,
                                    MovieInTheatre.findOne({
                                        where: {
                                            id: movieInTheatreId,
                                            runningStatus: "running"
                                        }
                                    })
                                ];
                            case 3:
                                movieInTheatre = _state.sent();
                                if (!movieInTheatre) {
                                    throw new Error("Movie in Theatre not found.");
                                }
                                movieId = movieInTheatre.movieId;
                                return [
                                    4,
                                    MovieScreen.findOne({
                                        where: {
                                            screenId: screenId,
                                            CinemahallmovieId: movieInTheatreId
                                        }
                                    })
                                ];
                            case 4:
                                movieScreen = _state.sent();
                                if (!movieScreen) {
                                    throw new Error("Movie is not assigned to this screen.");
                                }
                                if (new Date(showTimeDate) < new Date(movieScreen.movieopendate) || new Date(showTimeDate) > new Date(movieScreen.movieclosedate)) {
                                    throw new Error("Showtime date exceeds the movie's open or close date.");
                                }
                                return [
                                    4,
                                    Showtime.findOne({
                                        where: _define_property({
                                            screenId: screenId
                                        }, Op.or, [
                                            {
                                                startTime: _define_property({}, Op.between, [
                                                    startTime,
                                                    endTime
                                                ])
                                            },
                                            {
                                                endTime: _define_property({}, Op.between, [
                                                    startTime,
                                                    endTime
                                                ])
                                            },
                                            _define_property({}, Op.and, [
                                                {
                                                    startTime: _define_property({}, Op.lte, startTime)
                                                },
                                                {
                                                    endTime: _define_property({}, Op.gte, endTime)
                                                }
                                            ])
                                        ])
                                    })
                                ];
                            case 5:
                                existingShowtime = _state.sent();
                                if (existingShowtime) {
                                    throw new Error("There is already a showtime scheduled that overlaps with the provided time.");
                                }
                                return [
                                    4,
                                    Showtime.create({
                                        screenId: screenId,
                                        cinemaHallId: cinemaHallId,
                                        movieInTheatreId: movieInTheatreId,
                                        movieId: movieId,
                                        startTime: startTime,
                                        endTime: endTime,
                                        showTimeDate: showTimeDate
                                    })
                                ];
                            case 6:
                                newShowtime = _state.sent();
                                return [
                                    2,
                                    newShowtime
                                ];
                            case 7:
                                error = _state.sent();
                                console.log(error.message);
                                throw new Error("error creating showtime");
                            case 8:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        }
    ]);
    return ShowtimeService;
}();
