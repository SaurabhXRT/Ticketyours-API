import express, { Request, Response } from "express";
import { AddMovieService } from "../../services/AddMovieToCHservice.js";

const service = new AddMovieService();

export const addMovieToCinemaHall = async (req: Request, res: Response) => {
  const { cinemaHallId, movieId } = req.body;
  const operatorId = req.operator._id;

  if (!operatorId || !cinemaHallId || !movieId) {
    return res.status(400).json({
      code: "fields/empty",
      message: "All fields (operatorId, cinemaHallId, movieId) are required",
    });
  }


  try {
    const newMovie = await service.addMovieToCinemaHall(operatorId, cinemaHallId, movieId);

    res.status(201).json({
      code: "movie/added",
      message: "Movie added to cinema hall successfully",
      data: newMovie,
    });
  } catch (error) {
    console.error("Error adding movie to cinema hall:", error);
    res.status(500).json({
      code: "server/internal-error",
      message: error.message || "An internal server error occurred while adding the movie to the cinema hall.",
    });
  }
};


