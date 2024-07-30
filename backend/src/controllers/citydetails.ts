import { CityService } from "../services/CityService.js";

const cityService = new CityService();

export const getCityDetails = async (req: any, res: any) => {

    const { cityId } = req.params;
  
    try {
      const cityDetails = await cityService.getCityDetails(cityId);
      if (!cityDetails) {
        return res.status(404).json({
          code: "city/not-found",
          message: "City not found",
        });
      }
      res.status(200).json({
        code: "city/details-fetch-success",
        message: "City details fetched successfully",
        data: cityDetails,
      });
    } catch (error) {
      console.error("Error fetching city details:", error);
      res.status(500).json({
        code: "server/internal-error",
        message: "An internal server error occurred while fetching city details",
      });
    }
  };