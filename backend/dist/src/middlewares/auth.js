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
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv-flow';
import { UserLoginSession } from '../PGmodels/LoginSession/User.Loginsession.js';
import { OperatorLoginSession } from '../PGmodels/LoginSession/Operator.Loginsession.js';
// import { User } from '../PGmodels/User/User.js';
// import { CinemaOperator } from '../PGmodels/Operator/Operator.js';
dotenv.config();
export var AuthMiddleware = /*#__PURE__*/ function() {
    "use strict";
    function AuthMiddleware() {
        _class_call_check(this, AuthMiddleware);
    }
    _create_class(AuthMiddleware, null, [
        {
            key: "verifyToken",
            value: function verifyToken(req, res, next) {
                return _async_to_generator(function() {
                    var token, isValid, _ref, userId, operatorId, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                token = req.headers.authorization;
                                if (!token) {
                                    return [
                                        2,
                                        res.status(401).send("Unauthorized")
                                    ];
                                }
                                _state.label = 1;
                            case 1:
                                _state.trys.push([
                                    1,
                                    4,
                                    ,
                                    5
                                ]);
                                return [
                                    4,
                                    AuthMiddleware.validateToken(token)
                                ];
                            case 2:
                                isValid = _state.sent();
                                if (!isValid) {
                                    return [
                                        2,
                                        res.status(401).send("Invalid token")
                                    ];
                                }
                                return [
                                    4,
                                    AuthMiddleware.getActorIdFromToken(token)
                                ];
                            case 3:
                                _ref = _state.sent(), userId = _ref.userId, operatorId = _ref.operatorId;
                                if (userId) {
                                    req.userId = userId;
                                } else if (operatorId) {
                                    req.operatorId = operatorId;
                                } else {
                                    return [
                                        2,
                                        res.status(401).send("Unauthorized")
                                    ];
                                }
                                next();
                                return [
                                    3,
                                    5
                                ];
                            case 4:
                                error = _state.sent();
                                console.error("Token verification error:", error);
                                return [
                                    2,
                                    res.status(401).send("Unauthorized")
                                ];
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
            key: "validateToken",
            value: function validateToken(token) {
                return _async_to_generator(function() {
                    var secret;
                    return _ts_generator(this, function(_state) {
                        try {
                            secret = process.env.JWT_SECRET;
                            jwt.verify(token, secret);
                            return [
                                2,
                                true
                            ];
                        } catch (error) {
                            console.error("Token validation error:", error);
                            return [
                                2,
                                false
                            ];
                        }
                        return [
                            2
                        ];
                    });
                })();
            }
        },
        {
            key: "getActorIdFromToken",
            value: function getActorIdFromToken(token) {
                return _async_to_generator(function() {
                    var secret, decoded, loginSession, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    5,
                                    ,
                                    6
                                ]);
                                secret = process.env.JWT_SECRET;
                                decoded = jwt.verify(token, secret);
                                console.log(decoded);
                                if (!decoded.userId) return [
                                    3,
                                    2
                                ];
                                return [
                                    4,
                                    UserLoginSession.findOne({
                                        where: {
                                            userId: decoded.userId,
                                            token: token
                                        }
                                    })
                                ];
                            case 1:
                                loginSession = _state.sent();
                                if (loginSession) {
                                    return [
                                        2,
                                        {
                                            userId: decoded.userId
                                        }
                                    ];
                                }
                                return [
                                    3,
                                    4
                                ];
                            case 2:
                                if (!decoded.operatorId) return [
                                    3,
                                    4
                                ];
                                return [
                                    4,
                                    OperatorLoginSession.findOne({
                                        where: {
                                            operatorId: decoded.operatorId,
                                            token: token
                                        }
                                    })
                                ];
                            case 3:
                                loginSession = _state.sent();
                                if (loginSession) {
                                    return [
                                        2,
                                        {
                                            operatorId: decoded.operatorId
                                        }
                                    ];
                                }
                                _state.label = 4;
                            case 4:
                                console.log('Login session not found');
                                return [
                                    2,
                                    {}
                                ];
                            case 5:
                                error = _state.sent();
                                console.error("Get ID from token error:", error);
                                return [
                                    2,
                                    {}
                                ];
                            case 6:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        }
    ]);
    return AuthMiddleware;
}();
