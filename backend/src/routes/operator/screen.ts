import express from "express";
import { AuthMiddleware } from "../../middlewares/auth.js";
import { OperatorMiddleware } from "../../middlewares/actors/auth.operator.js";
import {addscreentocinemahall, getcinemahallscreen} from "../../controllers/operator/addscreen.js"


const router = express.Router();

router.post("/addscreentocinemhall/:cinemaHallId", AuthMiddleware.verifyToken, OperatorMiddleware.isOperator, addscreentocinemahall);
router.get("/getcinemahallscreen", AuthMiddleware.verifyToken, OperatorMiddleware.isOperator,getcinemahallscreen);
export default router;