import express from "express";
import { getCityDetails } from "../controllers/citydetails.js";

const router = express.Router();

router.get("/cities/:cityId", getCityDetails);

export default router;