import express, { Request, Response } from "express";
import { ShowtimeSlotService } from "../../services/AddShowtimeservice.js";

const service = new ShowtimeSlotService();

export const createShowtimeSlot = async (req: Request, res: Response) => {
    
  const {cinemaHallId, movieId, date, startTime, endTime} = req.body;
  const operatorId = req.operator._id;
  
  if ( !cinemaHallId || !movieId || !date || !startTime || !endTime ) {
    return res.status(400).json({
      code: "fields/empty",
      message: "All fields ( cinemaHallId, movieId, date, startTime, endTime) are required",
    });
  }

  try {
    const newShowtimeSlot = await service.createShowtimeSlot(
      operatorId,
      cinemaHallId,
      movieId,
      new Date(date),
      new Date(startTime),
      new Date(endTime),
    );

    res.status(201).json({
      code: "showtime-slot/created",
      message: "Showtime slot created successfully",
      data: newShowtimeSlot,
    });
  } catch (error) {
    console.error("Error creating showtime slot:", error);
    res.status(500).json({
      code: "server/internal-error",
      message: error.message || "An internal server error occurred while creating the showtime slot.",
    });
  }
};

