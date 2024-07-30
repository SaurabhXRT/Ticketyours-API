import express from "express";
import {createShowtimeSlot} from "../../controllers/operator/Createshowtime.js"; 
import { AuthMiddleware } from "../../middlewares/auth.js";
import { OperatorMiddleware } from "../../middlewares/actors/auth.operator.js";

const router = express.Router();

router.post("/create-showtime",AuthMiddleware.verifyToken, OperatorMiddleware.isOperator, createShowtimeSlot);

export default router;
