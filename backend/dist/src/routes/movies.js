import express from "express";
import { getMoviesByCityId, getMoviesByCinemaHallId, getMovieDetailById } from "../controllers/movie.js";
var router = express.Router();
router.get("/movies/city/:cityId", getMoviesByCityId);
router.get("/movies/cinemahall/:cinemaHallId", getMoviesByCinemaHallId);
router.get("/movies/moviedetail/:movieId", getMovieDetailById);
export default router;
