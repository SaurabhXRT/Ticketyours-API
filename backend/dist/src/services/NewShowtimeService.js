function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
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
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
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
import { CityCheck } from "../PGmodels/CityCheck/CityCheck.js";
import { CinemaHall } from "../PGmodels/CinemaHall/Cinemahall.js";
import logger from "../logger/logger.js";
import { Op } from "sequelize";
export var newShowtimeService = /*#__PURE__*/ function() {
    "use strict";
    function newShowtimeService() {
        _class_call_check(this, newShowtimeService);
    }
    _create_class(newShowtimeService, [
        {
            key: "getAvailableShowtimesWithDefault",
            value: function getAvailableShowtimesWithDefault(movieId, cityId) {
                return _async_to_generator(function() {
                    var cityCheck, cinemahallId, showtimes, availableDates, screenTypes, defaultDate, defaultScreenType, _defaultScreenType_split, defaultScreen, defaultLanguage, cinemaHalls, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    4,
                                    ,
                                    5
                                ]);
                                return [
                                    4,
                                    CityCheck.findOne({
                                        where: {
                                            movieId: movieId,
                                            cityId: cityId
                                        }
                                    })
                                ];
                            case 1:
                                cityCheck = _state.sent();
                                if (!cityCheck) {
                                    return [
                                        2,
                                        "Cinema hall not found"
                                    ];
                                }
                                cinemahallId = cityCheck.cinemaHallId;
                                return [
                                    4,
                                    Showtime.findAll({
                                        where: {
                                            movieId: movieId,
                                            showTimeDate: _define_property({}, Op.gte, new Date())
                                        },
                                        include: {
                                            model: Screen,
                                            as: "screen",
                                            attributes: [
                                                "screenType",
                                                "screenLanguage"
                                            ],
                                            include: {
                                                model: CinemaHall,
                                                as: "cinemahalls",
                                                where: {
                                                    id: cinemahallId
                                                },
                                                attributes: [
                                                    "id",
                                                    "name",
                                                    "location"
                                                ]
                                            }
                                        }
                                    })
                                ];
                            case 2:
                                showtimes = _state.sent();
                                if (showtimes.length === 0) {
                                    return [
                                        2,
                                        "No showtimes available"
                                    ];
                                }
                                availableDates = _to_consumable_array(new Set(showtimes.map(function(showtime) {
                                    return showtime.showTimeDate.toISOString().split("T")[0];
                                }))).sort();
                                screenTypes = _to_consumable_array(new Set(showtimes.map(function(showtime) {
                                    return "".concat(showtime.Screen.screenType, "-").concat(showtime.Screen.screenLanguage);
                                })));
                                defaultDate = availableDates[0];
                                defaultScreenType = screenTypes[0];
                                _defaultScreenType_split = _sliced_to_array(defaultScreenType.split("-"), 2), defaultScreen = _defaultScreenType_split[0], defaultLanguage = _defaultScreenType_split[1];
                                return [
                                    4,
                                    CinemaHall.findAll({
                                        include: {
                                            model: Screen,
                                            as: "screens",
                                            attributes: [
                                                "id"
                                            ],
                                            include: {
                                                model: Showtime,
                                                as: "showtimes",
                                                where: {
                                                    movieId: movieId,
                                                    showTimeDate: defaultDate
                                                },
                                                attributes: [
                                                    "id",
                                                    "startTime",
                                                    "endTime",
                                                    "showTimeDate"
                                                ]
                                            },
                                            where: {
                                                screenType: defaultScreen,
                                                screenLanguage: defaultLanguage
                                            }
                                        },
                                        where: {
                                            id: cinemahallId
                                        },
                                        attributes: [
                                            "id",
                                            "name",
                                            "location"
                                        ]
                                    })
                                ];
                            case 3:
                                cinemaHalls = _state.sent();
                                return [
                                    2,
                                    {
                                        availableDates: availableDates,
                                        screenTypes: screenTypes,
                                        defaultShowtimes: {
                                            date: defaultDate,
                                            screenType: defaultScreenType,
                                            cinemaHalls: cinemaHalls
                                        }
                                    }
                                ];
                            case 4:
                                error = _state.sent();
                                logger.log(error);
                                throw new Error("error in getting showtimes");
                            case 5:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "getCinemaHallsWithShowtimes",
            value: function getCinemaHallsWithShowtimes(movieId, cityId, selectedDate, selectedScreenType) {
                return _async_to_generator(function() {
                    var _selectedScreenType_split, screenType, screenLanguage, cityCheck, cinemahallId, cinemaHalls, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    3,
                                    ,
                                    4
                                ]);
                                _selectedScreenType_split = _sliced_to_array(selectedScreenType.split("-"), 2), screenType = _selectedScreenType_split[0], screenLanguage = _selectedScreenType_split[1];
                                return [
                                    4,
                                    CityCheck.findOne({
                                        where: {
                                            movieId: movieId,
                                            cityId: cityId
                                        }
                                    })
                                ];
                            case 1:
                                cityCheck = _state.sent();
                                cinemahallId = cityCheck.cinemaHallId;
                                return [
                                    4,
                                    CinemaHall.findAll({
                                        include: {
                                            model: Screen,
                                            as: "screens",
                                            attributes: [
                                                "id"
                                            ],
                                            include: {
                                                model: Showtime,
                                                as: "showtimes",
                                                where: {
                                                    movieId: movieId,
                                                    showTimeDate: selectedDate
                                                },
                                                attributes: [
                                                    "id",
                                                    "startTime",
                                                    "endTime",
                                                    "showTimeDate"
                                                ]
                                            },
                                            where: {
                                                screenType: screenType,
                                                screenLanguage: screenLanguage
                                            }
                                        },
                                        where: {
                                            id: cinemahallId
                                        },
                                        attributes: [
                                            "id",
                                            "name",
                                            "location"
                                        ]
                                    })
                                ];
                            case 2:
                                cinemaHalls = _state.sent();
                                if (!cinemaHalls.length) {
                                    return [
                                        2,
                                        "No cinema halls found"
                                    ];
                                }
                                return [
                                    2,
                                    cinemaHalls
                                ];
                            case 3:
                                error = _state.sent();
                                logger.log(error);
                                throw new Error("error getting shotimes");
                            case 4:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        }
    ]);
    return newShowtimeService;
}();
