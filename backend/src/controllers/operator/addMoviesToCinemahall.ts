import express, { Request, Response } from "express";
import { AddMovieService } from "../../services/AddMovieToCHservice.js";

const service = new AddMovieService();

export const addMovieToCinemaHall = async (req: Request, res: Response) => {

// #swagger.description = 'add a movie to the registered cinemhall by the operator it required cinemhallid movieid and cityid in the body'
  const { cinemaHallId, movieId, cityId } = req.body;
  const operatorId = req.operatorId;

  if (!operatorId || !cinemaHallId || !movieId) {
    return res.status(400).json({
      code: "fields/empty",
      message: "All fields (operatorId, cinemaHallId, movieId) are required",
    });
  }


  try {
    const newMovie = await service.addMovieToCinemaHall(operatorId, cinemaHallId, movieId, cityId);
    if(newMovie === "This movie is already in your cinema hall"){
      res.status(401).send({
        code: "movie/already-present",
        message: "This movie is already in your cinema hall"
      });
      return;
    } else if (newMovie === "Movie not found"){
      res.status(404).send({
        code: "movie/not-found",
        message: "The movie you want to add doesnt exist"
      });
      return;
    }

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


