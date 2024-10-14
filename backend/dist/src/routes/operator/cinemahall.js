import express from "express";
import { addcinemahall } from "../../controllers/operator/addCinemahall.js";
import { addMovieToCinemaHall } from "../../controllers/operator/addMoviesToCinemahall.js";
import { AuthMiddleware } from "../../middlewares/auth.js";
import { OperatorMiddleware } from "../../middlewares/actors/auth.operator.js";
var router = express.Router();
router.post("/register-cinemhall", AuthMiddleware.verifyToken, OperatorMiddleware.isOperator, addcinemahall);
router.post("/addmovietocinemahall-screen", AuthMiddleware.verifyToken, OperatorMiddleware.isOperator, addMovieToCinemaHall);
export default router;
