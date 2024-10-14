import express from "express";
import { getscreen } from "../controllers/moviescreen.js";
var router = express.Router();
router.get("/cinemahall/screen/:cinemaHallId", getscreen);
export default router;
