import  express from "express";
import {reserveSeatStatus} from "../controllers/seatdetails.js";

const router = express.Router();

router.post("/reserve-seat/:showtimeId", reserveSeatStatus);

export default router;
