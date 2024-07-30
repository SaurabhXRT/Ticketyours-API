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
import mongoose from "mongoose";
import City from "../models/city/City.js";
import CityModel from "../models/city/City.model.js";
var seedCities = function() {
    var _ref = _async_to_generator(function() {
        var cities, session, i, city, savedCity, cityModel, err;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    cities = [
                        {
                            name: 'Mumbai',
                            state: 'Maharashtra'
                        },
                        {
                            name: 'Delhi',
                            state: 'Delhi'
                        },
                        {
                            name: 'Bengaluru',
                            state: 'Karnataka'
                        },
                        {
                            name: 'Hyderabad',
                            state: 'Telangana'
                        },
                        {
                            name: 'Ahmedabad',
                            state: 'Gujarat'
                        },
                        {
                            name: 'Chennai',
                            state: 'Tamil Nadu'
                        },
                        {
                            name: 'Kolkata',
                            state: 'West Bengal'
                        },
                        {
                            name: 'Surat',
                            state: 'Gujarat'
                        },
                        {
                            name: 'Pune',
                            state: 'Maharashtra'
                        },
                        {
                            name: 'Jaipur',
                            state: 'Rajasthan'
                        }
                    ];
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        11,
                        ,
                        12
                    ]);
                    return [
                        4,
                        mongoose.startSession()
                    ];
                case 2:
                    session = _state.sent();
                    session.startTransaction();
                    return [
                        4,
                        City.deleteMany({}).session(session)
                    ];
                case 3:
                    _state.sent();
                    return [
                        4,
                        CityModel.deleteMany({}).session(session)
                    ];
                case 4:
                    _state.sent();
                    i = 0;
                    _state.label = 5;
                case 5:
                    if (!(i < cities.length)) return [
                        3,
                        9
                    ];
                    city = new City({
                        name: cities[i].name,
                        state: cities[i].state
                    });
                    return [
                        4,
                        city.save({
                            session: session
                        })
                    ];
                case 6:
                    savedCity = _state.sent();
                    cityModel = new CityModel({
                        name: savedCity.name,
                        state: savedCity.state,
                        cityId: savedCity._id,
                        cinemaHalls: [],
                        cinemaMovies: []
                    });
                    return [
                        4,
                        cityModel.save({
                            session: session
                        })
                    ];
                case 7:
                    _state.sent();
                    _state.label = 8;
                case 8:
                    i++;
                    return [
                        3,
                        5
                    ];
                case 9:
                    return [
                        4,
                        session.commitTransaction()
                    ];
                case 10:
                    _state.sent();
                    session.endSession();
                    console.log('Database seeded with cities and city models!');
                    return [
                        3,
                        12
                    ];
                case 11:
                    err = _state.sent();
                    console.error('Error seeding cities:', err.message);
                    process.exit(1);
                    return [
                        3,
                        12
                    ];
                case 12:
                    return [
                        2
                    ];
            }
        });
    });
    return function seedCities() {
        return _ref.apply(this, arguments);
    };
}();
export default seedCities;
