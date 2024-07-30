import { Model, DataTypes } from 'sequelize';
import { centralDatabase } from '../../config/dbconfig.js';

class Seat extends Model {}

Seat.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    showtimeId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    seatNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seatPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    seatType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookingStatus: {
      type: DataTypes.ENUM('available', 'booked', 'locked'),
      defaultValue: 'available',
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: centralDatabase.getInstance(),
    modelName: 'Seat',
    timestamps: true,
  }
);

export { Seat };
