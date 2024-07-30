import { Model, DataTypes } from 'sequelize';
import { centralDatabase } from '../../config/dbconfig.js';

class Screen extends Model {}

Screen.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    cinemaHallId: {
      type: DataTypes.UUID,
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
    modelName: 'Screen',
    timestamps: true,
  }
);

export { Screen };
