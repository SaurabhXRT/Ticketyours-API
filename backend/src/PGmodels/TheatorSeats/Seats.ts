import { Model, DataTypes } from 'sequelize';
import { centralDatabase } from '../../config/dbconfig.js';

class SeatStatus extends Model {}

SeatStatus.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    showtimeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    seatRow: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seatNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('available', 'booked', 'reserved'),
      allowNull: false,
      defaultValue: 'available',
    },
  },
  {
    sequelize: centralDatabase.getInstance(),
    modelName: 'SeatStatus',
    timestamps: true,
  }
);

export { SeatStatus };
