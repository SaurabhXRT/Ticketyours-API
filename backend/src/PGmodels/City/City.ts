import { Model, DataTypes } from "sequelize";
import { centralDatabase } from "../../config/dbconfig.js";

class City extends Model {}

City.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: centralDatabase.getInstance(),
    modelName: "City",
    timestamps: true,
  }
);

export { City };
