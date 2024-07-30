// src/routes/city.ts
import express from "express";
import { getAllCities, searchCities } from "../controllers/searchcity.js";

const router = express.Router();

router.get("/cities", getAllCities);
router.get("/cities/search", searchCities);

export default router;
