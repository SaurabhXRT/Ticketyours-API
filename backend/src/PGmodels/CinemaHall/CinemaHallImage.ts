import { Model, DataTypes } from "sequelize";
import { centralDatabase } from "../../config/dbconfig.js";


class CinemaHallImage extends Model {}

CinemaHallImage.init(
  {
    cinemaHallId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: centralDatabase.getInstance(),
    modelName: "CinemaHallImage",
    timestamps: true,
  }
);

export { CinemaHallImage };
