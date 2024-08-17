import { Model, DataTypes } from 'sequelize';
import { centralDatabase } from "../../config/dbconfig.js";

class MovieCast extends Model {}

MovieCast.init(
  {
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    castId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: centralDatabase.getInstance(),
    modelName: 'MovieCast',
    timestamps: true,
  }
);

export { MovieCast };
