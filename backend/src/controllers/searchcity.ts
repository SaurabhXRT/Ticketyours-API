// src/controllers/city.ts
//import { Request, Response } from "express";
import { CityService } from "../services/CityService.js";

const cityService = new CityService();

export const getAllCities = async (req: any, res: any) => {
  try {
    const cities = await cityService.getAllCities();
    res.status(200).json({
      code: "cities/fetch-success",
      message: "Cities fetched successfully",
      data: cities,
    });
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({
      code: "server/internal-error",
      message: "An internal server error occurred while fetching cities",
    });
  }
};

export const searchCities = async (req: any, res: any) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({
      code: "fields/empty-query",
      message: "Query parameter is required",
    });
  }

  try {
    const cities = await cityService.searchCities(city as string);
    res.status(200).json({
      code: "cities/search-success",
      message: "Cities searched successfully",
      data: cities,
    });
  } catch (error) {
    console.error("Error searching cities:", error);
    res.status(500).json({
      code: "server/internal-error",
      message: "An internal server error occurred while searching cities",
    });
  }
};
