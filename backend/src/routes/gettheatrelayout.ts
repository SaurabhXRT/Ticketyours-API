import express  from "express";
import {getTheatreLayout } from "../controllers/gettheatrelayout.js";

const router = express.Router();

router.get("/get-theatre-layout/:showtimeId", getTheatreLayout);

export default router;