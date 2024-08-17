import { Model, DataTypes } from 'sequelize';
import { centralDatabase } from '../../config/dbconfig.js';

class Showtime extends Model {}

Showtime.init(
  {
    screenId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cinemaHallId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    showTimeDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize: centralDatabase.getInstance(),
    modelName: 'Showtime',
    timestamps: true,
  }
);

export { Showtime };
