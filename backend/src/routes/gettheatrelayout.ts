import express  from "express";
import {getTheatreLayout } from "../controllers/gettheatrelayout.js";

const router = express.Router();

router.get("/get-theatre-layout/:showtimeId/screen/:screenId", getTheatreLayout);

export default router;