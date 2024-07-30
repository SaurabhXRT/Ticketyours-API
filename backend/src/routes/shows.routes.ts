import express  from "express";
import {getShowtimeSlots} from "../controllers/showtimeslot.js";
import {getSeatDetails}  from "../controllers/seatdetails.js";

const router = express.Router();

router.get("/showtimes/:movieId/:cinemaHallId", getShowtimeSlots);
router.get("/seatdetails/:showtimeId", getSeatDetails);

export default router;