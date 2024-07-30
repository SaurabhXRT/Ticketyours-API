import pino from "pino"
import dotenv from "dotenv-flow"
dotenv.config()

const developmentPinoOptions = {
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true
    }
  }
}

const productionPinoOptions = {
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true
    }
  }
}
//type Level = "fatal" | "error" | "warn" | "info" | "debug" | "trace";
function getProductionPinoLogger(pinoOptions: any, logPath: string) {
  console.log("Production logging path:" + logPath)
  return pino({ level: pinoOptions.level }, pino.destination(logPath))
}
function getDevelopmentPinoLogger(pinoOptions: any) {
  return pino(pinoOptions)
}

const errorLogger =
  process.env.NODE_ENV === "production"
    ? getProductionPinoLogger({ ...productionPinoOptions, level: "error" }, `${process.env.LOG_DIR || "."}/error-logger.log`)
    : getDevelopmentPinoLogger({ ...developmentPinoOptions, level: "error" })
const allLogger =
  process.env.NODE_ENV === "production"
    ? getProductionPinoLogger({ ...productionPinoOptions, level: "info" }, `${process.env.LOG_DIR || "."}/info-logger.log`)
    : getDevelopmentPinoLogger({ ...developmentPinoOptions, level: "debug" })

function log(message: any, data?: any) {
  process.env.NODE_ENV === "production"
    ? allLogger.info(data ? data : message, data ? message : undefined)
    : allLogger.debug(data ? data : message, data ? message : undefined)
}

function error(err: any, message?: string) {
  errorLogger.error(err, message)
}

function debug() {}

function fatal() {}

function warn() {}

let logger = { log, error }
export default logger

