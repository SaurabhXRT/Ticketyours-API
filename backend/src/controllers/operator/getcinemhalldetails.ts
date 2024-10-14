import { getCinemhalldetail } from "../../services/Operator.CinemahallDetail.js";
import { Request, Response } from 'express';

const service = new getCinemhalldetail();

export const getoperatorCinemhall = async(req: any, res:any) => {
    // #swagger.description = 'get operator cinemahall it required token'
    const operatorId = req.operatorId;
    try {
        const cinemahall = await service.getcinemhallDetail(operatorId);
        if(cinemahall === "no cinemahall found for this operator"){
            return res.status(400).json({
                code: "cinemhall/not-found",
                message: "no cinemahall found for this operator",
            });
        }
        return res.status(200).json({
            code: "cinemhall/fetched-successfully",
            message: "cinemahall feched succesfully",
            data: cinemahall,
        });
    } catch(error){
        console.log(error);
        if(error.message.includes("error fetching cinemahall")){
            return res.status(500).json({
                code: "cinemhall/error-feching",
                message: "error fetching cinemahall",
            });
        }
    }
};

export const getCinemahallMovie = async(req:any,res:any) => {
    // #swagger.description = 'get movie running in  operator cinemahall '
    const operatorId = req.operatorId;
    try {
        const response = await service.getCinemhallMovie(operatorId);
        if(response === "no cinemahall found for this operator"){
            return res.status(400).json({
                code: "cinemhall/not-found",
                message: "no cinemahall found for this operator",
            });
        }
        return res.status(200).json({
            code: "cinemahallmovie/fetched-succesfully",
            message: "cinemhallmovie fetched successfully",
            data: response,
        });

    }catch(error){
        console.log(error);
        if(error.message.includes("Failed to fetch movies for cinema hall")){
            return res.status(500).json({
                code: "cinemahallmovie/error-finding",
                message: "Failed to fetch movies for cinema hall",
            });
        }
    }
}
