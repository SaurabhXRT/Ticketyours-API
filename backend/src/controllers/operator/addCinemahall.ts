import express, { Request, Response } from "express";
import { AddCinemaHallservice } from "../../services/AddCinemaHallservice.js";


const service = new AddCinemaHallservice;

export const addcinemahall = async (req: Request, res: Response) => {
  // #swagger.description = 'register a cinemhall by the operator and authorization is required'
    const body = req.body;
    const operatorId = req.operatorId;
    const cinemhalldata = {
        name: body.name,
        operatorId: operatorId,
        location: body.location,
        state: body.state,
        zipcode: body.zipcode,
        cityId: body.cityId
    }
  
  if (!body.name || !body.location || !body.zipcode) {
    return res.status(400).json({
      code: "fields/empty",
      message: "All fields ( name, location,zipcode) are required",
    });
  }

  try {

    const existingCinemaHall = await service.findCinemaHallByNameAndOperator(cinemhalldata.name, operatorId);
    if (existingCinemaHall) {
      return res.status(400).json({
        code: "cinema-hall/alreadyexists",
        message: "A cinema hall with this name is already registered by this operator",
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


