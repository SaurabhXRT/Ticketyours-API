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
import { CinemaHallService } from "../services/CinemahallService.js";
import { redisGetAsync, redisSetAsync } from "../redis/redis.js";
var cinemaHallService = new CinemaHallService();
export var getCinemaHalls = function() {
    var _ref = _async_to_generator(function(req, res) {
        var cityId, cachekey, cachedData, cinemaHalls, cinemaHalls1, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    // #swagger.description = 'get all the cinemhall in a city using cityid'
                    cityId = req.params.cityId;
                    cachekey = "cinemaHalls:".concat(cityId);
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        5,
                        ,
                        6
                    ]);
                    return [
                        4,
                        redisGetAsync(cachekey)
                    ];
                case 2:
                    cachedData = _state.sent();
                    if (cachedData) {
                        cinemaHalls = JSON.parse(cachedData);
                        res.status(200).json({
                            code: "cinemahalls/fetch-success",
                            message: "Cinema halls fetched successfully",
                            data: cinemaHalls
                        });
                    }
                    return [
                        4,
                        cinemaHallService.getCinemaHallsByCityId(cityId)
                    ];
                case 3:
                    cinemaHalls1 = _state.sent();
                    return [
                        4,
                        redisSetAsync(cachekey, JSON.stringify(cinemaHalls1), 'EX', 3600)
                    ];
                case 4:
                    _state.sent();
                    res.status(200).json({
                        code: "cinemahalls/fetch-success",
                        message: "Cinema halls fetched successfully",
                        data: cinemaHalls1
                    });
                    return [
                        3,
                        6
                    ];
                case 5:
                    error = _state.sent();
                    res.status(404).json({
                        code: "cinemahalls/not-found",
                        message: error.message
                    });
                    return [
                        3,
                        6
                    ];
                case 6:
                    return [
                        2
                    ];
            }
        });
    });
    return function getCinemaHalls(req, res) {
        return _ref.apply(this, arguments);
    };
}();
export var getCinemaHallsByCityAndMovie = function() {
    var _ref = _async_to_generator(function(req, res) {
        var cityId, movieId, cinemaHalls, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    // #swagger.description = 'get all the cinemhall in which a particular movie is running using cityid and movieid '
                    cityId = req.params.cityId;
                    movieId = req.params.movieId;
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        3,
                        ,
                        4
                    ]);
                    return [
                        4,
                        cinemaHallService.getCinemaHallsByCityIdAndMovieId(cityId, movieId)
                    ];
                case 2:
                    cinemaHalls = _state.sent();
                    if (cinemaHalls === "No cinema halls found for this movie in the specified city") {
                        res.status(404).send({
                            code: "cinemahalls/not-found",
                            message: "No cinema halls found for this movie in the specified city"
                        });
                        return [
                            2
                        ];
                    }
                    res.status(200).json({
                        code: "cinemahalls/fetch-success",
                        message: "Cinema halls for the movie fetched successfully",
                        data: cinemaHalls
                    });
                    return [
                        3,
                        4
                    ];
                case 3:
                    error = _state.sent();
                    res.status(404).json({
                        code: "cinemahalls/not-found",
                        message: error.message
                    });
                    return [
                        3,
                        4
                    ];
                case 4:
                    return [
                        2
                    ];
            }
        });
    });
    return function getCinemaHallsByCityAndMovie(req, res) {
        return _ref.apply(this, arguments);
    };
}();
