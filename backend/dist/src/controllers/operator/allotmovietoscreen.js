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
import { AllotMovieToScreenService } from '../../services/AllotMovieToScreenService.js';
var service = new AllotMovieToScreenService();
export var allotMovieToScreen = function() {
    var _ref = _async_to_generator(function(req, res) {
        var _req_body, screenId, movieInTheatreId, cinemaHallId, operatorId, movieScreen, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    // #swagger.description = 'allot a movie to the any screen of the cinemhallid'
                    _req_body = req.body, screenId = _req_body.screenId, movieInTheatreId = _req_body.movieInTheatreId;
                    cinemaHallId = req.params.cinemaHallId;
                    operatorId = req.operatorId;
                    if (!screenId || !movieInTheatreId) {
                        return [
                            2,
                            res.status(400).json({
                                code: 'fields/empty',
                                message: 'Screen ID and Movie In Theatre ID are required'
                            })
                        ];
                    }
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
                        service.allotMovieToScreen(screenId, cinemaHallId, movieInTheatreId, operatorId)
                    ];
                case 2:
                    movieScreen = _state.sent();
                    res.status(201).json({
                        code: 'movie-screen/allotted',
                        message: 'Movie has been successfully allotted to the screen.',
                        data: movieScreen
                    });
                    return [
                        3,
                        4
                    ];
                case 3:
                    error = _state.sent();
                    console.error('Error allotting movie to screen:', error.message);
                    if (error.message.includes('Screen not found')) {
                        return [
                            2,
                            res.status(404).json({
                                code: 'screen/not-found',
                                message: "Screen not found or does not belong to the specified cinema hall."
                            })
                        ];
                    }
                    if (error.message.includes('Movie not found')) {
                        return [
                            2,
                            res.status(404).json({
                                code: 'movie/not-found',
                                message: "Movie not found in the specified cinema hall."
                            })
                        ];
                    }
                    if (error.message.includes('already assigned a movie')) {
                        return [
                            2,
                            res.status(409).json({
                                code: 'screen/already-assigned',
                                message: "This screen is already assigned a movie."
                            })
                        ];
                    }
                    res.status(500).json({
                        code: 'server/internal-error',
                        message: 'An internal server error occurred while allotting the movie to the screen.'
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
    return function allotMovieToScreen(req, res) {
        return _ref.apply(this, arguments);
    };
}();
