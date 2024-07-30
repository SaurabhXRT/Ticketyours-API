import express, { Request, Response } from "express";
import { SeatingArrangementService } from "../../services/SeatingArrangementService.js";

const service = new SeatingArrangementService();

export const CreateSeatingLayout = async (req: Request, res: Response) => {
  const { cinema_hall_id, seatConfigurations } = req.body;

  if (!cinema_hall_id || !seatConfigurations) {
    return res.status(400).json({
      code: "fields/empty",
      message: "All fields (cinema_hall_id, seatConfigurations) are required",
    });
  }

  try {
    const newSeatingArrangement = await service.createSeatingArrangement(cinema_hall_id, seatConfigurations);
    res.status(201).json({
      code: "seating-arrangement/created",
      message: "Seating arrangement created successfully",
      data: newSeatingArrangement,
    });
  } catch (error) {
    console.error("Error creating seating arrangement:", error);
    res.status(500).json({
      code: "server/internal-error",
      message: "An internal server error occurred while creating the seating arrangement.",
    });
  }
};

