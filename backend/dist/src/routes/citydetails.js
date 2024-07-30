import express from "express";
import { getCityDetails } from "../controllers/citydetails.js";
var router = express.Router();
router.get("/cities/:cityId", getCityDetails);
export default router;
