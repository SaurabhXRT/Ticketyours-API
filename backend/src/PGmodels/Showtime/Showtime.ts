import { Model, DataTypes } from 'sequelize';
import { centralDatabase } from '../../config/dbconfig.js';

class Showtime extends Model {}

Showtime.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    movieInCinemaHallId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    screenId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    showTime: {
      type: DataTypes.DATE,
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
    modelName: 'Showtime',
    timestamps: true,
  }
);

export { Showtime };
