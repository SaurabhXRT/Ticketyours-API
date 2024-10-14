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
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Admin } from '../PGmodels/Admin/Admin.js';
import { AdminLoginSession } from '../PGmodels/LoginSession/Admin.Loginsession.js';
export var AdminAuthService = /*#__PURE__*/ function() {
    "use strict";
    function AdminAuthService() {
        _class_call_check(this, AdminAuthService);
    }
    _create_class(AdminAuthService, [
        {
            key: "get",
            value: function get(phone) {
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    Admin.findOne({
                                        where: {
                                            phone: phone
                                        }
                                    })
                                ];
                            case 1:
                                return [
                                    2,
                                    _state.sent()
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "create",
            value: function create(adminCredentials) {
                return _async_to_generator(function() {
                    var newAdmin;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    Admin.create({
                                        name: adminCredentials.name,
                                        email: adminCredentials.email,
                                        passwordHash: adminCredentials.password,
                                        phone: adminCredentials.phone
                                    })
                                ];
                            case 1:
                                newAdmin = _state.sent();
                                return [
                                    2,
                                    newAdmin
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "hashPassword",
            value: function hashPassword(password) {
                return _async_to_generator(function() {
                    var salt;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    bcrypt.genSalt(10)
                                ];
                            case 1:
                                salt = _state.sent();
                                return [
                                    4,
                                    bcrypt.hash(password, salt)
                                ];
                            case 2:
                                return [
                                    2,
                                    _state.sent()
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "comparePassword",
            value: function comparePassword(password, hash) {
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    bcrypt.compare(password, hash)
                                ];
                            case 1:
                                return [
                                    2,
                                    _state.sent()
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "loginWithPassword",
            value: function loginWithPassword(userCredentials) {
                var _this = this;
                return _async_to_generator(function() {
                    var user, isPasswordCorrect, secret, token;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    _this.get(userCredentials.phone)
                                ];
                            case 1:
                                user = _state.sent();
                                if (!user) {
                                    return [
                                        2,
                                        "User not found"
                                    ];
                                }
                                user = user.toJSON();
                                console.log(user);
                                return [
                                    4,
                                    bcrypt.compare(userCredentials.password, user.passwordHash)
                                ];
                            case 2:
                                isPasswordCorrect = _state.sent();
                                if (!isPasswordCorrect) {
                                    return [
                                        2,
                                        "incorrect password"
                                    ];
                                }
                                secret = process.env.JWT_SECRET;
                                token = jwt.sign({
                                    adminId: user.id
                                }, secret, {
                                    expiresIn: "30d"
                                });
                                return [
                                    4,
                                    AdminLoginSession.create({
                                        adminId: user.id,
                                        token: token
                                    })
                                ];
                            case 3:
                                _state.sent();
                                return [
                                    2,
                                    token
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "logout",
            value: function logout(token) {
                return _async_to_generator(function() {
                    var loginSession;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    AdminLoginSession.findOne({
                                        where: {
                                            token: token
                                        }
                                    })
                                ];
                            case 1:
                                loginSession = _state.sent();
                                if (!loginSession) {
                                    return [
                                        2,
                                        "Invalid token"
                                    ];
                                }
                                return [
                                    4,
                                    AdminLoginSession.destroy({
                                        where: {
                                            token: token
                                        }
                                    })
                                ];
                            case 2:
                                _state.sent();
                                return [
                                    2,
                                    "Logout successful"
                                ];
                        }
                    });
                })();
            }
        }
    ]);
    return AdminAuthService;
}();
