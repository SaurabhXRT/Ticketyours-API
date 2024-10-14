import express from "express";
import { getoperatorCinemhall, getCinemahallMovie } from "../../controllers/operator/getcinemhalldetails.js";
import { AuthMiddleware } from "../../middlewares/auth.js";
import { OperatorMiddleware } from "../../middlewares/actors/auth.operator.js";
var router = express.Router();
router.post("/get-operator-cinemahall", AuthMiddleware.verifyToken, OperatorMiddleware.isOperator, getoperatorCinemhall);
router.post("/get-operator-cinemahall-movieintheatre", AuthMiddleware.verifyToken, OperatorMiddleware.isOperator, getCinemahallMovie);
export default router;
