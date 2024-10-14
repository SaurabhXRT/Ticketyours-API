import express, { Request, Response } from "express";
import { AddMovieService } from "../../services/AddMovieToCHservice.js";

const service = new AddMovieService();

export const addMovieToCinemaHall = async (req: Request, res: Response) => {

// #swagger.description = 'add a movie to the registered cinemhall screen by the operator it required screenid and movielanguage which 
//language is playing in screen cinemhallid movieid and cityid in the body'
  const { cinemaHallId, movieId, cityId,screenId, movielanguage,movieopendate,movieclosedate } = req.body;
  const operatorId = req.operatorId;

  if (!operatorId || !cinemaHallId || !movieId || !screenId || ! movieopendate ||!movieclosedate ) {
    return res.status(400).json({
      code: "fields/empty",
      message: "All fields (operatorId, cinemaHallId, movieId) are required",
    });
  }

  try {
    const newMovie = await service.addMovieToCinemaHall(operatorId, cinemaHallId, movieId, cityId,screenId, movielanguage, movieopendate,movieclosedate );
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
    if (error.message.includes('Screen not found')) {
      return res.status(404).json({
        code: 'screen/not-found',
        message: "Screen not found or does not belong to the specified cinema hall.",
      });
    }

    if (error.message.includes('Movie not found')) {
      return res.status(404).json({
        code: 'movie/not-found',
        message: "Movie not found in the specified cinema hall.",
      });
    }

    if (error.message.includes('already assigned a movie')) {
      return res.status(409).json({
        code: 'screen/already-assigned',
        message: "This screen is already assigned a movie.",
      });
    }
    res.status(500).json({
      code: "server/internal-error",
      message: error.message || "An internal server error occurred while adding the movie to the cinema hall.",
    });
  } 
};


