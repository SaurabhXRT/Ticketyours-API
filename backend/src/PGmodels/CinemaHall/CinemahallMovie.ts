import { Model, DataTypes } from 'sequelize';
import { centralDatabase } from "../../config/dbconfig.js";

class CinemaHallMovie extends Model {}

CinemaHallMovie.init(
  {
    cinemaHallId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    CinemahallmovieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
  },
  {
    sequelize: centralDatabase.getInstance(),
    modelName: 'CinemaHallMovie',
    timestamps: true,
  }
);

export { CinemaHallMovie };
