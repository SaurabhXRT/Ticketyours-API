//import { City } from "../../PGmodels/City/City.js";
import logger from "../../logger/logger.js";
import { CityService } from "../../services/CityService.js";

export const addCity = async (req: any, res: any) => {
  const { name, state } = req.body;
  if (!name || !state) {
    return res.status(400).json({
      code: "fields/empty-primary-field",
      message: "One of the fields is required - name, state",
    });
  }
  const citydetail = {
    name: name,
    state: state,
  };
  const service = new CityService();

  try {
    const existingcity = await service.checkexistingcity(citydetail.name);
    if(existingcity){
        return res.status(400).json({
            code: "city/already-exist",
            message: "this cityname already exist"
        });
    }
    const response = await service.createcity(citydetail);
    res.status(200).json({
        code: "city/city-created",
        message: "city has been successfully crearted",
        data: response,
    });

  } catch (error) {
    logger.log(error);
    res.status(500).json({
      code: "server/internal-error",
      message: "An internal server error occurred ",
    });
  }
};
