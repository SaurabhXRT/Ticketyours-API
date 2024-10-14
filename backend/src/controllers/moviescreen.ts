import { GetScreenService } from "../services/GetScreenService.js";
const service = new GetScreenService();

export const getscreen = async(req:any,res:any) => {
      // #swagger.description = 'get all screen inside a cinemahall'
    const cinemaHallId = req.params.cinemaHallId;
    if(!cinemaHallId){
        return res.status(400).json({
            code: "screen/required-field",
            message: "cinemahallid is required",
        });
    }
    try {
        const screen = await service.getscreen(cinemaHallId);
        if(!screen){
            return res.status(404).json({
                code: "screen/not-found",
                message: "screen not found",
            });
        }
        res.status(200).json({
            code: "screen/fetched-successfully",
            message: "screen found successfully",
            data: screen,
        });
    } catch(error){
        console.log(error);
        if(error.message.includes("there is no any cinemahall")){
            return res.status(404).json({
                code: "cinemahall/not-found",
                message: "there is no any cinemahall"
            });
        }
        if(error.message.includes("screen not found")){
            return res.status(404).json({
                code:"screen/not-found",
                message: "screen not found",
            });
        }

        res.status(500).json({
            code:"internal/server-error",
            message: "internal server error occurred",
        });
    }

}