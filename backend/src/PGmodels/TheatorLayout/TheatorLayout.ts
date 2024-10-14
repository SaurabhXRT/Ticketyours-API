import { Model, DataTypes } from 'sequelize';
import { centralDatabase } from '../../config/dbconfig.js';

class TheatreLayout extends Model {}

TheatreLayout.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cinemaHallId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cinemaHallscreenId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    seatArrangement: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    sequelize: centralDatabase.getInstance(),
    modelName: 'TheatreLayout',
    timestamps: true,
  }
);

export { TheatreLayout };
