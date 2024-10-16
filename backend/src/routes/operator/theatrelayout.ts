import express from "express";
import { createTheatreLayout } from "../../controllers/operator/theatreslayout.js"; 
import { getTheatreLayout } from "../../controllers/operator/theatreslayout.js"; 
import { AuthMiddleware } from "../../middlewares/auth.js";
import { OperatorMiddleware } from "../../middlewares/actors/auth.operator.js";

const router = express.Router();

router.post("/create-theatre-layout", AuthMiddleware.verifyToken, OperatorMiddleware.isOperator, createTheatreLayout);
router.get("/get-theatre-layout/:cinemaHallId/screen/:screenId",AuthMiddleware.verifyToken, OperatorMiddleware.isOperator, getTheatreLayout);

export default router;
