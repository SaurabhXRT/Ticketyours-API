import express  from "express";
import {getShowtimesByScreenIdController} from "../controllers/showtimeslot.js";
import {getShowtimesByScreenIdAndDateController} from "../controllers/showtimeslot.js";
import { getShowtimesbyMovieIdAndCityId,getShowtimesBySelecteddateAndScreentype} from "../controllers/getshowtimeslot.js"


const router = express.Router();

router.get("/showtimes/:screenId", getShowtimesByScreenIdController);
router.get("/showtimesbydate/:screenId", getShowtimesByScreenIdAndDateController);
router.get("/showtimes/:movieId/city/:cityId/availableShowtimes", getShowtimesbyMovieIdAndCityId);
router.get("/showtimes/:movieId/city/:cityId/cinemahallswithselectedquery", getShowtimesBySelecteddateAndScreentype);

export default router;