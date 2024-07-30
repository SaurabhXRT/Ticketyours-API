import { Model, DataTypes } from 'sequelize';
import { centralDatabase } from "../../config/dbconfig.js";

class CinemaHallMovie extends Model {}

CinemaHallMovie.init(
  {
    cinemaHallId: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    CinemahallmovieId: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
  },
  {
    sequelize: centralDatabase.getInstance(),
    modelName: 'CinemaHallMovie',
    timestamps: true,
  }
);

export { CinemaHallMovie };
