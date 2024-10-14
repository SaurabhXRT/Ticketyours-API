import { Model, DataTypes } from "sequelize";
import { centralDatabase } from "../../config/dbconfig.js";

class Movievotes extends Model {}

Movievotes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    upvotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
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
    modelName: "Movievotes",
    timestamps: true,
  }
);

export { Movievotes };
