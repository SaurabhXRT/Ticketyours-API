import { Model, DataTypes } from "sequelize";
import { centralDatabase } from "../../config/dbconfig.js";

class CityMovie extends Model {}

CityMovie.init(
  {
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: centralDatabase.getInstance(),
    modelName: "CityMovie",
    timestamps: true,
  }
);

export { CityMovie };
