import { Request, Response } from 'express';
import { TheatreLayoutService } from '../../services/AddTheatreLayoutService.js';

const theatreLayoutService = new TheatreLayoutService();

export const createTheatreLayout = async (req: Request, res: Response) => {
  // #swagger.description = 'create a theatre layout for the cinemhall'
  try {
    const { cinemaHallId, screenId, seatArrangement } = req.body;

    if (!cinemaHallId || !screenId || !seatArrangement) {
      return res.status(400).json({
        code: 'fields/empty',
        message: 'Cinema Hall ID , screenid and Seat Arrangement are required',
      });
    }

    const newLayout = await theatreLayoutService.createTheatreLayout(
      cinemaHallId,
      screenId,
      seatArrangement
    );

    res.status(201).json({
      code: 'theatre-layout/created',
      message: 'Theatre layout created successfully',
      data: newLayout,
    });
  } catch (error) {
    console.error('Error creating theatre layout:', error);
    
    if(error.message.includes("a theatre layout already exist")){
      return res.status(401).send({
        code: "theatrelayout/already-exist",
        message: "a theatre layout already exist for this cinemahall"
      });
    }
    res.status(500).json({
      code: 'server/internal-error',
      message: 'An internal server error occurred while creating the theatre layout.',
    });
  }
};

export const getTheatreLayout = async (req: Request, res: Response) => {
  // #swagger.description = 'fetch the theatre layout'
try {
  const { cinemaHallId, screenId } = req.params;

  const layout = await theatreLayoutService.getTheatreLayout(cinemaHallId,screenId);

  res.status(200).json({
    code: 'theatre-layout/found',
    message: 'Theatre layout retrieved successfully',
    data: layout,
  });
} catch (error) {
  console.error('Error fetching theatre layout:', error);
  res.status(500).json({
    code: 'server/internal-error',
    message: 'An internal server error occurred while fetching the theatre layout.',
  });
}
};

