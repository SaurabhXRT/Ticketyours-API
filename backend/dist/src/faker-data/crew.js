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
import { Crew } from '../PGmodels/MovieDetail/Crew.js';
var crewData = [
    {
        name: "Leonardo DiCaprio",
        imageUrl: "https://example.com/leonardo.jpg"
    },
    {
        name: "Morgan Freeman",
        imageUrl: "https://example.com/morgan.jpg"
    },
    {
        name: "Tom Hanks",
        imageUrl: "https://example.com/tom.jpg"
    },
    {
        name: "Julia Roberts",
        imageUrl: "https://example.com/julia.jpg"
    },
    {
        name: "Brad Pitt",
        imageUrl: "https://example.com/brad.jpg"
    },
    {
        name: "Angelina Jolie",
        imageUrl: "https://example.com/angelina.jpg"
    },
    {
        name: "Robert Downey Jr.",
        imageUrl: "https://example.com/robert.jpg"
    },
    {
        name: "Scarlett Johansson",
        imageUrl: "https://example.com/scarlett.jpg"
    },
    {
        name: "Will Smith",
        imageUrl: "https://example.com/will.jpg"
    },
    {
        name: "Jennifer Lawrence",
        imageUrl: "https://example.com/jennifer.jpg"
    }
];
var seedCrew = function() {
    var _ref = _async_to_generator(function() {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, cast, err, err1;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    _state.trys.push([
                        0,
                        9,
                        ,
                        10
                    ]);
                    _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        6,
                        7,
                        8
                    ]);
                    _iterator = crewData[Symbol.iterator]();
                    _state.label = 2;
                case 2:
                    if (!!(_iteratorNormalCompletion = (_step = _iterator.next()).done)) return [
                        3,
                        5
                    ];
                    cast = _step.value;
                    return [
                        4,
                        Crew.create({
                            name: cast.name,
                            imageUrl: cast.imageUrl
                        })
                    ];
                case 3:
                    _state.sent();
                    _state.label = 4;
                case 4:
                    _iteratorNormalCompletion = true;
                    return [
                        3,
                        2
                    ];
                case 5:
                    return [
                        3,
                        8
                    ];
                case 6:
                    err = _state.sent();
                    _didIteratorError = true;
                    _iteratorError = err;
                    return [
                        3,
                        8
                    ];
                case 7:
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                    return [
                        7
                    ];
                case 8:
                    console.log('Database seeded with crew!');
                    return [
                        3,
                        10
                    ];
                case 9:
                    err1 = _state.sent();
                    console.error('Error seeding crew:', err1.message);
                    process.exit(1);
                    return [
                        3,
                        10
                    ];
                case 10:
                    return [
                        2
                    ];
            }
        });
    });
    return function seedCrew() {
        return _ref.apply(this, arguments);
    };
}();
export default seedCrew;
