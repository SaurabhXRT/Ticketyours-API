import express, { Request, Response } from "express";
import dotenv from "dotenv-flow";
dotenv.config();
import cors from "cors";
import connectDB from "./database/db.js";
import logger from "./logger/logger.js";
//import seedCities from "./faker-data/city.js";
//import seedMovies from "./faker-data/movie.js";

import authroutes from "./routes/user/auth.js";
import cityRoutes from "./routes/searchcity.js";
import cityDetails from "./routes/citydetails.js";
import cinemahallroutes from "./routes/cinemahall.js";
import showsroutes from "./routes/shows.routes.js";
import movieroutes from "./routes/movies.js";
import operatorAuthroutes from "./routes/operator/auth.js";
import operatorcinemahallroutes from "./routes/operator/cinemahall.js";
import operatorshowtimeroutes from "./routes/operator/showtime.js";
import operatorcreateseatinglayout from "./routes/operator/seatinglayout.js";
import operatorsearchmovie from "./routes/operator/movie.js";
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
server.use("/operator/v2", operatorshowtimeroutes);
server.use("/operator/v3", operatorcreateseatinglayout);
server.use("/operator/v4", operatorsearchmovie);

//api
server.use("/auth", authroutes);
server.use("/v1", cityRoutes);
server.use("/v2", cityDetails);
server.use("/v3", cinemahallroutes);
server.use("/v4", movieroutes);
server.use("/v5", showsroutes);
// Uncomment to seed cities (if needed)
//seedCities();
//seedMovies();
// Define routes and middleware
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
    message: "WelcomimageRoutere to the ticketyours API",
  });
});

server.get("/error", (req, res) => {
  const error = new Error("This is a test error!");
  logger.error(error);
  res.status(500).send("Error logged");
});

export default server;
