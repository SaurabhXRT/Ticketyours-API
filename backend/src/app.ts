import express, { Request, Response } from "express";
import dotenv from "dotenv-flow";
dotenv.config();
import cors from "cors";
import connectDB from "./database/db.js";
import logger from "./logger/logger.js";
// import seedCities from "./faker-data/city.js";
// import seedMovies from "./faker-data/movie.js";
// import seedCast from "./faker-data/cast.js";
// import seedMovieCast from "./faker-data/moviecast.js";
// import seedCrew from "./faker-data/crew.js";
// import seedMovieCrew from "./faker-data/moviecrew.js";
import authroutes from "./routes/user/auth.js";
import cityRoutes from "./routes/searchcity.js";
import cinemahallroutes from "./routes/cinemahall.js";
import showsroutes from "./routes/shows.routes.js";
import movieroutes from "./routes/movies.js";
import fetchtheatrelayout from "./routes/gettheatrelayout.js";
import seatstatusroutes from "./routes/seatstatusroutes.js";
import operatorAuthroutes from "./routes/operator/auth.js";
import operatorcinemahallroutes from "./routes/operator/cinemahall.js";
import operatorshowtimeroutes from "./routes/operator/showtime.js";
import operatorcreatetheatrelayout from "./routes/operator/theatrelayout.js";
import operatorhmovieroutes from "./routes/operator/movie.js";
import operatorscreen from "./routes/operator/screen.js";
import bodyParser from "body-parser";

const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.json());
server.use(
  cors({
    origin: process.env.CORS_WHITELISTED,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  })
);
// Connect to database
connectDB();
//operator
server.use("/operator", operatorAuthroutes);
server.use("/operator/v1", operatorcinemahallroutes);
server.use("/operator/v1", operatorshowtimeroutes);
server.use("/operator/v1", operatorcreatetheatrelayout);
server.use("/operator/v1", operatorhmovieroutes);
server.use("/operator/v1", operatorscreen);

//api
server.use("/auth", authroutes);
server.use("/v1", cityRoutes);
server.use("/v1", cinemahallroutes);
server.use("/v1", movieroutes);
server.use("/v1", showsroutes);
server.use("/v1", fetchtheatrelayout);
server.use("/v1", seatstatusroutes);
//seedCities();
//seedMovies();
//seedCast();
//seedMovieCast();
//seedCrew();
//seedMovieCrew();

process.on("uncaughtException", (err) => {
  logger.error("An error occured which was not caught");
  logger.error(err);
});

process.on("unhandledRejection", (err) => {
  logger.error("An  unhandled rejection was caught");
  logger.error(err);
});

server.get("/", (req, res) => {
  res.json({
    message: "Welcome to the ticketyours API",
  });
});

// server.get("/error", (req, res) => {
//   const error = new Error("This is a test error!");
//   logger.error(error);
//   res.status(500).send("Error logged");
// });

export default server;
