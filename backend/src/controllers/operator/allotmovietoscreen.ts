import { Request, Response } from 'express';
import { AllotMovieToScreenService } from '../../services/AllotMovieToScreenService.js';

const service = new AllotMovieToScreenService();

//  const allotMovieToScreen = async (req: Request, res: Response) => {
//   // #swagger.description = 'allot a movie to the any screen of the cinemhallid'
//   const { screenId, movieInTheatreId , movielanguage } = req.body;
//   const cinemaHallId = req.params.cinemaHallId;
//   const operatorId = req.operatorId;

//   if (!screenId || !movieInTheatreId) {
//     return res.status(400).json({
//       code: 'fields/empty',
//       message: 'Screen ID and Movie In Theatre ID are required',
//     });
//   }

//   try {
//     const movieScreen = await service.allotMovieToScreen(screenId, cinemaHallId, movieInTheatreId, operatorId,  movielanguage);

//     res.status(201).json({
//       code: 'movie-screen/allotted',
//       message: 'Movie has been successfully allotted to the screen.',
//       data: movieScreen,
//     });

//   } catch (error) {
//     console.error('Error allotting movie to screen:', error.message);

//     if (error.message.includes('Screen not found')) {
//       return res.status(404).json({
//         code: 'screen/not-found',
//         message: "Screen not found or does not belong to the specified cinema hall.",
//       });
//     }

//     if (error.message.includes('Movie not found')) {
//       return res.status(404).json({
//         code: 'movie/not-found',
//         message: "Movie not found in the specified cinema hall.",
//       });
//     }

//     if (error.message.includes('This screen already has a movie scheduled during the given date range')) {
//       return res.status(409).json({
//         code: 'screen/already-assigned',
//         message: "This screen already has a movie scheduled during the given date range",
//       });
//     }

//     res.status(500).json({
//       code: 'server/internal-error',
//       message: 'An internal server error occurred while allotting the movie to the screen.',
//     });
//   }
// };

export const getMovieLanguage = async (req:any,res:any) => {
  const cinemaHallId = req.params.cinemaHallId;
  const movieInTheatreId = req.params.movieInTheatreId;

  if(!movieInTheatreId || !cinemaHallId){
    return res.status(400).json({
      code: "movielanguage/require-field",
      message: "fileds value are required",
    })
  }

  try {
    const language = await service.getMovielanguage(cinemaHallId,movieInTheatreId);
    if(!language){
      return res.status(404).json({
        code: "language/not-found",
        message: "language not found",
      });
    }

    return res.status(200).json({
      code: "language/fetched-successfully",
      message: "movie language fetched successfully",
      data: language,
    })

  } catch (error){
    console.log(error);
    if(error.message.includes("Movie not found in the specified cinema hall.")){
      return res.status(404).json({
        code: 'movie/not-found',
        message: "Movie not found in the specified cinema hall.",
      });
    }

    if(error.message.includes("no movie lnaguage exist")){
      return res.status(500).json({
        code: "language/not-found",
        message: "no movie lnaguage exist",
      })
    }
    res.status(500).json({
      code: 'server/internal-error',
      message: 'An internal server error occurred',
    });
  }
}
