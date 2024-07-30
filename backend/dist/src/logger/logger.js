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
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
import pino from "pino";
import dotenv from "dotenv-flow";
dotenv.config();
var developmentPinoOptions = {
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true
        }
    }
};
var productionPinoOptions = {
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true
        }
    }
};
//type Level = "fatal" | "error" | "warn" | "info" | "debug" | "trace";
function getProductionPinoLogger(pinoOptions, logPath) {
    console.log("Production logging path:" + logPath);
    return pino({
        level: pinoOptions.level
    }, pino.destination(logPath));
}
function getDevelopmentPinoLogger(pinoOptions) {
    return pino(pinoOptions);
}
var errorLogger = process.env.NODE_ENV === "production" ? getProductionPinoLogger(_object_spread_props(_object_spread({}, productionPinoOptions), {
    level: "error"
}), "".concat(process.env.LOG_DIR || ".", "/error-logger.log")) : getDevelopmentPinoLogger(_object_spread_props(_object_spread({}, developmentPinoOptions), {
    level: "error"
}));
var allLogger = process.env.NODE_ENV === "production" ? getProductionPinoLogger(_object_spread_props(_object_spread({}, productionPinoOptions), {
    level: "info"
}), "".concat(process.env.LOG_DIR || ".", "/info-logger.log")) : getDevelopmentPinoLogger(_object_spread_props(_object_spread({}, developmentPinoOptions), {
    level: "debug"
}));
function log(message, data) {
    process.env.NODE_ENV === "production" ? allLogger.info(data ? data : message, data ? message : undefined) : allLogger.debug(data ? data : message, data ? message : undefined);
}
function error(err, message) {
    errorLogger.error(err, message);
}
function debug() {}
function fatal() {}
function warn() {}
var logger = {
    log: log,
    error: error
};
export default logger;