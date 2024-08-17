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
import express from "express";
import { UserService } from "../../services/UserService.js";
import { AuthService } from "../../services/AuthService.js";
import logger from "../../logger/logger.js";
var router = express.Router();
export var register = function() {
    var _ref = _async_to_generator(function(req, res) {
        var body, userCredentials, userService, existingUser, hashedPassword, user, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    // #swagger.description = 'Register a new user'
                    body = req.body;
                    userCredentials = {
                        name: body.name,
                        email: body.email,
                        username: body.username,
                        password: body.password,
                        phone: body.phone
                    };
                    if (!(body.name || body.email)) {
                        return [
                            2,
                            res.status(400).json({
                                code: "fields/empty-primary-field",
                                message: "One of the fields is required - Email, Username"
                            })
                        ];
                    }
                    userService = new UserService();
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
                        userService.get(userCredentials.phone)
                    ];
                case 2:
                    existingUser = _state.sent();
                    if (existingUser) {
                        return [
                            2,
                            res.status(400).json({
                                code: "auth/user-exists",
                                message: "User with this mobile number already exists"
                            })
                        ];
                    }
                    return [
                        4,
                        userService.hashPassword(userCredentials.password)
                    ];
                case 3:
                    hashedPassword = _state.sent();
                    userCredentials.password = hashedPassword;
                    return [
                        4,
                        userService.create(userCredentials)
                    ];
                case 4:
                    user = _state.sent();
                    res.status(200).json({
                        code: "auth/success",
                        message: "User registered successfully",
                        data: user
                    });
                    return [
                        3,
                        6
                    ];
                case 5:
                    error = _state.sent();
                    console.error("Error registering user:", error);
                    logger.log("Error registering user:", error);
                    res.status(500).json({
                        code: "server/internal-error",
                        message: "An internal server error occurred while creating your account."
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
    return function register(req, res) {
        return _ref.apply(this, arguments);
    };
}();
export var login = function() {
    var _ref = _async_to_generator(function(req, res) {
        var body, userCredentials, authService, user, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    // #swagger.description = 'login with phone and password for a user' 
                    body = req.body;
                    userCredentials = {
                        phone: body.phone,
                        password: body.password
                    };
                    authService = new AuthService();
                    if (!(body.phone || body.password)) {
                        res.status(400).send({
                            code: "fields/empty-primary-field",
                            message: "One of the fields is required - phone , password"
                        });
                        return [
                            2
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
                        authService.loginWithPassword(userCredentials)
                    ];
                case 2:
                    user = _state.sent();
                    if (user === "User not found") {
                        res.status(404).send({
                            code: "auth/user-not-found",
                            message: "User not found"
                        });
                        return [
                            2
                        ];
                    } else if (user === "incorrect password") {
                        res.status(401).send({
                            code: "auth/wrong-password",
                            message: "Wrong password"
                        });
                        return [
                            2
                        ];
                    }
                    res.status(200).json({
                        code: "auth/success",
                        message: "User logged in successfully",
                        data: user
                    });
                    return [
                        3,
                        4
                    ];
                case 3:
                    error = _state.sent();
                    logger.error(error);
                    console.log(error);
                    res.status(500).send({
                        code: "server/internal-error",
                        message: "An internal server error occured while login using phone"
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
    return function login(req, res) {
        return _ref.apply(this, arguments);
    };
}();
export var logout = function() {
    var _ref = _async_to_generator(function(req, res) {
        var token, authService, user, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    // #swagger.description = 'logout a user'
                    token = req.headers.authorization;
                    if (!token) {
                        res.status(400).send({
                            code: "auth/invalid-token",
                            message: "Invalid token"
                        });
                    }
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        3,
                        ,
                        4
                    ]);
                    authService = new AuthService();
                    return [
                        4,
                        authService.logout(token)
                    ];
                case 2:
                    user = _state.sent();
                    if (user == "Invalid token") {
                        res.status(400).send({
                            code: "field/invalid-token",
                            message: "Invalid token"
                        });
                        return [
                            2
                        ];
                    } else if (user == "Error saving login session") {
                        res.status(500).send({
                            code: "server/internal-error",
                            message: "An internal server error occured while saving login session"
                        });
                        return [
                            2
                        ];
                    } else {
                        res.status(200).send({
                            code: "auth/success",
                            message: "User logged out successfully"
                        });
                        return [
                            2
                        ];
                    }
                    return [
                        3,
                        4
                    ];
                case 3:
                    error = _state.sent();
                    logger.error(error);
                    res.status(500).send({
                        code: "server/internal-error",
                        message: "An internal server error occured"
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
    return function logout(req, res) {
        return _ref.apply(this, arguments);
    };
}();
export default router;
