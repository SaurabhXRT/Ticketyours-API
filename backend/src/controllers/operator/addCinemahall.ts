import express, { Request, Response } from "express";
import { AddCinemaHallservice } from "../../services/AddCinemaHallservice.js";


const service = new AddCinemaHallservice;

export const addcinemahall = async (req: Request, res: Response) => {
    const body = req.body;
    const operatorId = req.operator._id;
    const cinemhalldata = {
        name: body.name,
        operator_id: operatorId,
        street: body.street,
        city_id: body.cityId,
        state: body.state,
        zipcode: body.zipcode,
        total_seats: body.totalseats
    }
  
  if (!body.name || !body.totalSeats) {
    return res.status(400).json({
      code: "fields/empty",
      message: "All fields ( name, totalSeats) are required",
    });
  }

  try {

    // Check if a cinema hall with the same name already exists
    const existingCinemaHall = await service.findCinemaHallByName(cinemhalldata.name);
    if (existingCinemaHall) {
        return res.status(400).json({
            code: "cinema-hall/alreadyexists",
            message: "cinemahall with this name already exists",
          });
    }
    const newCinemaHall = await service.addcinemahall(cinemhalldata);

    res.status(201).json({
      code: "cinema-hall/created",
      message: "Cinema hall created successfully",
      data: newCinemaHall,
    });
  } catch (error) {
    console.error("Error creating cinema hall:", error);
    res.status(500).json({
      code: "server/internal-error",
      message: "An internal server error occurred while creating the cinema hall.",
    });
  }
};


