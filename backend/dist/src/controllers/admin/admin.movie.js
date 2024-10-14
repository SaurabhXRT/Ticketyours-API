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
import { AdminMovieService } from "../../services/Admin.MovieService.js";
var service = new AdminMovieService();
export var addMovietodbcontroller = function() {
    var _ref = _async_to_generator(function(req, res) {
        var moviedata, response, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    moviedata = {
                        title: req.body.title,
                        posterUrl: req.body.posterUrl,
                        genre: req.body.genre,
                        releaseDate: req.body.releaseDate,
                        duration: req.body.duration,
                        description: req.body.description
                    };
                    if (!moviedata.description || !moviedata.duration || !moviedata.genre || !moviedata.posterUrl || !moviedata.releaseDate || !moviedata.title) {
                        return [
                            2,
                            res.status(400).json({
                                message: "all fields are required"
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
                        service.addMovietoDb(moviedata)
                    ];
                case 2:
                    response = _state.sent();
                    if (response === "movie with this name already exist") {
                        return [
                            2,
                            res.status(400).json({
                                code: "addmovie/movie-alreadyexist",
                                message: "movie with this name already exist"
                            })
                        ];
                    }
                    res.status(200).json({
                        code: "addmovie/movie-adedd",
                        message: "movie adedd to the database successfully",
                        data: response
                    });
                    return [
                        3,
                        4
                    ];
                case 3:
                    error = _state.sent();
                    console.log(error);
                    if (error.message.includes("error creating movie")) {
                        return [
                            2,
                            res.status(500).json({
                                code: "addmovie/error-creating-movie",
                                message: "error creating movie"
                            })
                        ];
                    }
                    res.status(500).json({
                        code: "adminmovie/server-error",
                        message: "internal server occured while creating movie"
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
    return function addMovietodbcontroller(req, res) {
        return _ref.apply(this, arguments);
    };
}();
export var addCasttothedb = function() {
    var _ref = _async_to_generator(function(req, res) {
        var castdata, response, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    castdata = {
                        name: req.body.name,
                        imageUrl: req.body.imageUrl
                    };
                    if (!castdata.name || !castdata.imageUrl) {
                        return [
                            2,
                            res.status(400).json({
                                message: "all fields are required"
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
                        service.addMovieCast(castdata)
                    ];
                case 2:
                    response = _state.sent();
                    if (response === "this cast alrady adedd") {
                        return [
                            2,
                            res.status(400).json({
                                code: "addcast/cast-already-present",
                                message: "this cast alrady adedd"
                            })
                        ];
                    }
                    res.status(200).json({
                        code: "addcast/cast-adedd-successfully",
                        message: "cast adedd to movie successfully",
                        data: response
                    });
                    return [
                        3,
                        4
                    ];
                case 3:
                    error = _state.sent();
                    console.log(error);
                    if (error.message.includes("error creating casts data")) {
                        return [
                            2,
                            res.status(500).json({
                                code: "addcast/cast-notcreated",
                                message: "error creating casts data"
                            })
                        ];
                    }
                    res.status(500).json({
                        code: "addcast/server-error",
                        message: "internal server error while creating cast"
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
    return function addCasttothedb(req, res) {
        return _ref.apply(this, arguments);
    };
}();
export var addCrewstothedb = function() {
    var _ref = _async_to_generator(function(req, res) {
        var crewdata, response, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    crewdata = {
                        name: req.body.name,
                        imageUrl: req.body.imageUrl
                    };
                    if (!crewdata.name || !crewdata.imageUrl) {
                        return [
                            2,
                            res.status(400).json({
                                message: "all fields are required"
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
                        service.addMovieCrews(crewdata)
                    ];
                case 2:
                    response = _state.sent();
                    if (response === "this crew alrady adedd") {
                        return [
                            2,
                            res.status(400).json({
                                code: "addcrew/crew-already-present",
                                message: "this crew alrady adedd"
                            })
                        ];
                    }
                    res.status(200).json({
                        code: "addcrew/crew-adedd-successfully",
                        message: "crew adedd to the movie successfully",
                        data: response
                    });
                    return [
                        3,
                        4
                    ];
                case 3:
                    error = _state.sent();
                    console.log(error);
                    if (error.message.includes("error creating crew data")) {
                        return [
                            2,
                            res.status(500).json({
                                code: "addcrew/crew-notcreated",
                                message: "error creating crews data"
                            })
                        ];
                    }
                    res.status(500).json({
                        code: "addcrew/server-error",
                        message: "internal server error while creating crew"
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
    return function addCrewstothedb(req, res) {
        return _ref.apply(this, arguments);
    };
}();
export var searchCast = function() {
    var _ref = _async_to_generator(function(req, res) {
        var castname, response, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    castname = req.query.castname;
                    if (!castname) {
                        return [
                            2,
                            res.status(400).json({
                                message: "castname query required"
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
                        service.searchCasts(castname)
                    ];
                case 2:
                    response = _state.sent();
                    return [
                        2,
                        res.status(200).json({
                            code: "searchcast/searched-succesfully",
                            message: "cast serached successfully",
                            data: response
                        })
                    ];
                case 3:
                    error = _state.sent();
                    console.log(error);
                    return [
                        2,
                        res.status(500).json({
                            code: "searchcast/internal-server-error",
                            message: "internel server error occured while searching cast"
                        })
                    ];
                case 4:
                    return [
                        2
                    ];
            }
        });
    });
    return function searchCast(req, res) {
        return _ref.apply(this, arguments);
    };
}();
export var searchCrew = function() {
    var _ref = _async_to_generator(function(req, res) {
        var crewname, response, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    crewname = req.query.crewname;
                    if (!crewname) {
                        return [
                            2,
                            res.status(400).json({
                                message: "crewname required"
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
                        service.searchCrews(crewname)
                    ];
                case 2:
                    response = _state.sent();
                    return [
                        2,
                        res.status(200).json({
                            code: "searchcrew/crews-fetched-successfully",
                            message: "crews have been searched successfully",
                            data: response
                        })
                    ];
                case 3:
                    error = _state.sent();
                    console.log(error);
                    res.status(500).json({
                        code: "searchcrew/interenal-server-error",
                        message: "internal server error occurred while searching crew"
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
    return function searchCrew(req, res) {
        return _ref.apply(this, arguments);
    };
}();
export var addcastToTheMovie = function() {
    var _ref = _async_to_generator(function(req, res) {
        var data, response, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    data = req.body.moviecastdetails;
                    if (!data) {
                        return [
                            2,
                            res.status(400).json({
                                message: "all fields are required"
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
                        service.addCastToMovie(data)
                    ];
                case 2:
                    response = _state.sent();
                    return [
                        2,
                        res.status(200).json({
                            code: "addcastmovie/successfully-adeddd",
                            message: "cast adedd to the movie",
                            data: response
                        })
                    ];
                case 3:
                    error = _state.sent();
                    console.log(error);
                    return [
                        2,
                        res.status(500).json({
                            code: "addcastmovie/internal-server",
                            message: "internel server errror occured"
                        })
                    ];
                case 4:
                    return [
                        2
                    ];
            }
        });
    });
    return function addcastToTheMovie(req, res) {
        return _ref.apply(this, arguments);
    };
}();
export var addCrewToTheMovie = function() {
    var _ref = _async_to_generator(function(req, res) {
        var data, response, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    data = req.body.moviecrewdetails;
                    if (!data) {
                        return [
                            2,
                            res.status(400).json({
                                message: "crew details are required for the movie"
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
                        service.addCrewToMovie(data)
                    ];
                case 2:
                    response = _state.sent();
                    return [
                        2,
                        res.status(200).json({
                            code: "addcrew/adedd-successfullly",
                            message: "crew adedd to the movie successfully",
                            data: response
                        })
                    ];
                case 3:
                    error = _state.sent();
                    console.log(error);
                    return [
                        2,
                        res.status(500).json({
                            code: "addcrew/internal-server-error",
                            message: "internal server occured while adding the crew to the movie"
                        })
                    ];
                case 4:
                    return [
                        2
                    ];
            }
        });
    });
    return function addCrewToTheMovie(req, res) {
        return _ref.apply(this, arguments);
    };
}();
export var addlanguagesToTheMovie = function() {
    var _ref = _async_to_generator(function(req, res) {
        var data, response, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    data = req.body.movielanguages;
                    if (!data) {
                        return [
                            2,
                            res.status(400).json({
                                message: "languages field are required"
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
                        service.addMovielanguage(data)
                    ];
                case 2:
                    response = _state.sent();
                    return [
                        2,
                        res.status(200).json({
                            code: "addlanguage/language-adedd",
                            message: "languagae adedd to the movie successfully",
                            data: response
                        })
                    ];
                case 3:
                    error = _state.sent();
                    console.log(error);
                    return [
                        2,
                        res.status(500).json({
                            code: "addlanguage/internel-server-error",
                            message: "internel server error occurrerd occured while adding language to the movie"
                        })
                    ];
                case 4:
                    return [
                        2
                    ];
            }
        });
    });
    return function addlanguagesToTheMovie(req, res) {
        return _ref.apply(this, arguments);
    };
}();
