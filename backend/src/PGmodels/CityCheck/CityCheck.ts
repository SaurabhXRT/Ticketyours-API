import { Model, DataTypes } from "sequelize";
import { centralDatabase } from "../../config/dbconfig.js";

class CityCheck extends Model {}

CityCheck.init(
  {
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cinemaHallId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: centralDatabase.getInstance(),
    modelName: "CityCheck",
    timestamps: true,
  }
);

export { CityCheck };
