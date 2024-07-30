import { Model, DataTypes } from 'sequelize';
import { centralDatabase } from "../../config/dbconfig.js";

class MovieCrew extends Model {}

MovieCrew.init(
  {
    movieId: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    crewId: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
  },
  {
    sequelize: centralDatabase.getInstance(),
    modelName: 'MovieCrew',
    timestamps: true,
  }
);

export { MovieCrew };
