import express from "express";
import { searchMoviesByName } from "../../controllers/operator/searchMovie.js"; 
import { AuthMiddleware } from "../../middlewares/auth.js";
import { OperatorMiddleware } from "../../middlewares/actors/auth.operator.js";
import { deleteMovieFromCinemaHall } from "../../controllers/operator/deletemovieintheatre.js";
import { getMovieLanguage } from "../../controllers/operator/allotmovietoscreen.js"
const router = express.Router();

// router.post("/allotMovietoscreen/:cinemaHallId", AuthMiddleware.verifyToken, OperatorMiddleware.isOperator, allotMovieToScreen);
router.get("/movie-search", AuthMiddleware.verifyToken, OperatorMiddleware.isOperator, searchMoviesByName);
router.get("/delete-movieintheatre", AuthMiddleware.verifyToken, OperatorMiddleware.isOperator, deleteMovieFromCinemaHall);
router.get("/movielanguage/:cinemaHallId/movieintheatre/:movieInTheatreId",AuthMiddleware.verifyToken, OperatorMiddleware.isOperator, getMovieLanguage)
export default router;