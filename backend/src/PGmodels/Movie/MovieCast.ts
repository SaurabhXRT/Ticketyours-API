import { Model, DataTypes } from 'sequelize';
import { centralDatabase } from "../../config/dbconfig.js";

class MovieCast extends Model {}

MovieCast.init(
  {
    movieId: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    castId: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
  },
  {
    sequelize: centralDatabase.getInstance(),
    modelName: 'MovieCast',
    timestamps: true,
  }
);

export { MovieCast };
