import express from "express";
import { searchMoviesByName } from "../../controllers/operator/searchMovie.js"; 
import { AuthMiddleware } from "../../middlewares/auth.js";
import { OperatorMiddleware } from "../../middlewares/actors/auth.operator.js";

const router = express.Router();

router.get("/movie-search", AuthMiddleware.verifyToken, OperatorMiddleware.isOperator, searchMoviesByName);

export default router;