import { Request, Response } from 'express';
import { TheatreLayoutService } from '.././services/TheatreLayoutService.js';

const theatreLayoutService = new TheatreLayoutService();

export const getTheatreLayout = async (req: Request, res: Response) => {
    // #swagger.description = 'get theatrea layout with seatstatus'
  try {
    const { showtimeId , screenId} = req.params;

    const layout = await theatreLayoutService.getTheatreLayoutWithSeatStatus(showtimeId, screenId);

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
