import { Model, DataTypes } from 'sequelize';
import { centralDatabase } from '../../config/dbconfig.js';


class CityCinemaHall extends Model {}

CityCinemaHall.init(
  {
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cinemaHallId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: centralDatabase.getInstance(),
    modelName: 'CityCinemaHall',
    timestamps: true,
  }
);

export { CityCinemaHall };
