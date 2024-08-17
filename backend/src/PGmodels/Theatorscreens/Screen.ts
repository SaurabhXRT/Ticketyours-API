import { Model, DataTypes } from 'sequelize';
import { centralDatabase } from '../../config/dbconfig.js';

class Screen extends Model {}

Screen.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    cinemaHallId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    screenNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    seatCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    screenType: {
      type: DataTypes.ENUM('2D', '3D'),
      allowNull: false,
    },
  },
  {
    sequelize: centralDatabase.getInstance(),
    modelName: 'Screen',
    timestamps: true,
  }
);

export { Screen };
