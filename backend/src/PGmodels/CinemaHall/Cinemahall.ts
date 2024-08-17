import { Model, DataTypes } from "sequelize";
import { centralDatabase } from "../../config/dbconfig.js";

class CinemaHall extends Model {}

CinemaHall.init(
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
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    operatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: centralDatabase.getInstance(),
    modelName: "CinemaHall",
    timestamps: true,
  }
);

export { CinemaHall };
