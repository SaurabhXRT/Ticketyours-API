import express from "express";
import { getTheatreLayout } from "../controllers/gettheatrelayout.js";
var router = express.Router();
router.get("/get-theatre-layout/:showtimeId", getTheatreLayout);
export default router;
