import { Model, DataTypes } from "sequelize";
import { centralDatabase } from "../../config/dbconfig.js";

class CinemaHall extends Model {}

CinemaHall.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
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
      type: DataTypes.UUID,
      allowNull: false,
    },
    cityId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  },
  {
    sequelize: centralDatabase.getInstance(),
    modelName: "CinemaHall",
    timestamps: true,
  }
);

export { CinemaHall };
