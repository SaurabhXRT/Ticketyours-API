import express from "express";
import { getShowtimesByScreenIdController } from "../controllers/showtimeslot.js";
import { getShowtimesByScreenIdAndDateController } from "../controllers/showtimeslot.js";
var router = express.Router();
router.get("/showtimes/:screenId", getShowtimesByScreenIdController);
router.get("/showtimesbydate/:screenId", getShowtimesByScreenIdAndDateController);
export default router;
