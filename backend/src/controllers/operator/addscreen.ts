import express, { Request, Response } from "express";
import { AddScreentoCinemaHallservice } from "../../services/AddScreentoCHservice.js";


const service = new AddScreentoCinemaHallservice;

export const addscreentocinemahall = async (req: Request, res: Response) => {
  // #swagger.description = 'add screen to the cinemahall'
    const body = req.body;
    const cinemaHallId = req.params.cinemaHallId;
    const operatorId = req.operatorId;
    const screendata = {
        screenType: body.screenType,
        seatCount: body.seatCount,
        screenNumber: body.screenNumber,
        operatorId: operatorId,
        cinemaHallId: cinemaHallId
    }
  
  if (!body.screenType || !body.seatCount || !body.screenNumber) {
    return res.status(400).json({
      code: "fields/empty",
      message: "All fields are required",
    });
  }

  try {

    const newCinemaHall = await service.addscreentocinemahall(screendata);
    
    if(newCinemaHall === "Cinema hall does not belong to the operator"){
        res.status(401).send({
            code: "cinema-hall/notfound",
            message: "Cinema hall does not belong to the operator"
        });
        return;
    }
    else if (newCinemaHall === "A screen with this number already exists in the cinema hall."){
      res.status(401).send({
        code: "screen/already-exist",
        message: "A screen with this number already exists in the cinema hall."
      });
      return;
    }

    res.status(201).json({
      code: "cinema-hall/created",
      message: "Cinema hall screen has been created successfully",
      data: newCinemaHall,
    });
  } catch (error) {
    console.error("Error creating cinema hall screen:", error);
    res.status(500).json({
      code: "server/internal-error",
      message: "An internal server error occurred while creating the cinema hall screen.",
    });
  }
};

export const getcinemahallscreen = async(req:any,res:any) => {
    // #swagger.description = 'fetch all screen present in the cinemahall'
  const operatorId = req.operatorId;
  try{
    const response = await service.getcinemahallScreen(operatorId);
    if(response === "no cinemahall for this operator"){
      return res.status(400).json({
        code: "screen/no-cinemahall-found",
        message: "no cinemahall for this operator" 
      });
    } else if(response === "there is no screen in this cinemahall"){
      return res.status(400).json({
        code: "screen/no-screen-found",
        message: "there is no any screen in this cinemahall"
      });
    }
    res.status(200).json({
      code: "screen/fetched-successfully",
      message: "screen fetched successfully",
      data: response
    });

  } catch(error){
    console.log(error);
    if(error.message.includes("failed to get screen")){
      return res.status(500).json({
        code: "screen/not-found",
        message: "failed to get screen"
      });
    }
  }
}


