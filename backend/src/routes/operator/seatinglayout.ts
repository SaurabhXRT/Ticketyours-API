import express from "express";
import { CreateSeatingLayout } from "../../controllers/operator/seatinglayout.js"; 
import { AuthMiddleware } from "../../middlewares/auth.js";
import { OperatorMiddleware } from "../../middlewares/actors/auth.operator.js";

const router = express.Router();

router.post("/create-seating-arrangement", AuthMiddleware.verifyToken, OperatorMiddleware.isOperator, CreateSeatingLayout);

export default router;
