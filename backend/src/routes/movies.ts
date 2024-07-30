import express  from "express";
import {getMoviesByCityId,getMoviesByCinemaHallId,getMovieDetailById} from "../controllers/movie.js";

const router = express.Router();

router.get("/movies/:cityId", getMoviesByCityId);
router.get("/movies/:cinemaHallId", getMoviesByCinemaHallId);
router.get("/movies/:movieId",getMovieDetailById);

export default router;