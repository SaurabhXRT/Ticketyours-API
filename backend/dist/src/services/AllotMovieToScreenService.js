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
import { Screen } from '../PGmodels/Theatorscreens/Screen.js';
import { MovieScreen } from '../PGmodels/Theatorscreens/MovieScreen.js';
import { CinemaHallMovie } from '../PGmodels/CinemaHall/CinemahallMovie.js';
import { MovieLanguage } from '../PGmodels/Movie/Movielanguage.js';
import { Op } from 'sequelize';
var AllotMovieToScreenService = /*#__PURE__*/ function() {
    "use strict";
    function AllotMovieToScreenService() {
        _class_call_check(this, AllotMovieToScreenService);
    }
    _create_class(AllotMovieToScreenService, [
        {
            key: "getMovielanguage",
            value: function getMovielanguage(cinemaHallId, movieInTheatreId) {
                return _async_to_generator(function() {
                    var movieInTheatre, movielanguage;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    CinemaHallMovie.findOne({
                                        where: {
                                            CinemahallmovieId: movieInTheatreId,
                                            cinemaHallId: cinemaHallId
                                        }
                                    })
                                ];
                            case 1:
                                movieInTheatre = _state.sent();
                                if (!movieInTheatre) {
                                    throw new Error('Movie not found in the specified cinema hall.');
                                }
                                return [
                                    4,
                                    MovieLanguage.findOne({
                                        where: {
                                            movieId: movieInTheatre.movieId
                                        },
                                        attributes: [
                                            "language"
                                        ]
                                    })
                                ];
                            case 2:
                                movielanguage = _state.sent();
                                if (!movielanguage) {
                                    throw new Error("no movie lnaguage exist");
                                }
                                return [
                                    2,
                                    movielanguage
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "allotMovieToScreen",
            value: function allotMovieToScreen(screenId, cinemaHallId, movieInTheatreId, operatorId, movielanguage, movieopendate, movieclosedate) {
                return _async_to_generator(function() {
                    var screen, conflictingMovieScreen, movieScreen;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    Screen.findOne({
                                        where: {
                                            id: screenId,
                                            cinemaHallId: cinemaHallId
                                        }
                                    })
                                ];
                            case 1:
                                screen = _state.sent();
                                if (!screen) {
                                    throw new Error('Screen not found or does not belong to the specified cinema hall.');
                                }
                                screen.screenLanguage = movielanguage;
                                return [
                                    4,
                                    screen.save()
                                ];
                            case 2:
                                _state.sent();
                                return [
                                    4,
                                    MovieScreen.findOne({
                                        where: _define_property({
                                            screenId: screenId
                                        }, Op.or, [
                                            {
                                                movieopendate: _define_property({}, Op.between, [
                                                    movieopendate,
                                                    movieclosedate
                                                ])
                                            },
                                            {
                                                movieclosedate: _define_property({}, Op.between, [
                                                    movieopendate,
                                                    movieclosedate
                                                ])
                                            },
                                            _define_property({}, Op.and, [
                                                {
                                                    movieopendate: _define_property({}, Op.lte, movieopendate)
                                                },
                                                {
                                                    movieclosedate: _define_property({}, Op.gte, movieclosedate)
                                                }
                                            ])
                                        ])
                                    })
                                ];
                            case 3:
                                conflictingMovieScreen = _state.sent();
                                if (conflictingMovieScreen) {
                                    throw new Error('This screen already has a movie scheduled during the given date range.');
                                }
                                return [
                                    4,
                                    MovieScreen.create({
                                        screenId: screenId,
                                        CinemahallmovieId: movieInTheatreId,
                                        movieopendate: movieopendate,
                                        movieclosedate: movieclosedate
                                    })
                                ];
                            case 4:
                                movieScreen = _state.sent();
                                return [
                                    2,
                                    movieScreen
                                ];
                        }
                    });
                })();
            }
        }
    ]);
    return AllotMovieToScreenService;
}();
export { AllotMovieToScreenService };
