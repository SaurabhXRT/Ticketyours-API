import { Model, DataTypes } from "sequelize";
import { centralDatabase } from "../../config/dbconfig.js";

class MovieScreen extends Model {}

MovieScreen.init(
  {
    screenId: {
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
    modelName: "MovieScreen",
    timestamps: true,
  }
);

export { MovieScreen };
