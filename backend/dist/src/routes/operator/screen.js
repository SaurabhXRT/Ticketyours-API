import express from "express";
import { AuthMiddleware } from "../../middlewares/auth.js";
import { OperatorMiddleware } from "../../middlewares/actors/auth.operator.js";
import { addscreentocinemahall } from "../../controllers/operator/addscreen.js";
var router = express.Router();
router.post("/addscreentocinemhall/:cinemaHallId", AuthMiddleware.verifyToken, OperatorMiddleware.isOperator, addscreentocinemahall);
export default router;
