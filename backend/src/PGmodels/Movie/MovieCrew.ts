import { Model, DataTypes } from 'sequelize';
import { centralDatabase } from "../../config/dbconfig.js";

class MovieCrew extends Model {}

MovieCrew.init(
  {
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    crewId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: centralDatabase.getInstance(),
    modelName: 'MovieCrew',
    timestamps: true,
  }
);

export { MovieCrew };
