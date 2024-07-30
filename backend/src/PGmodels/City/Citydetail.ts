import { Model, DataTypes } from 'sequelize';
import { centralDatabase } from '../../config/dbconfig.js';


class CityDetail extends Model {}

CityDetail.init(
  {
    id: {
      type: DataTypes.STRING(128),
      primaryKey: true,
    },
    cityId: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cinemaHallId: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    movieId: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    sequelize: centralDatabase.getInstance(),
    modelName: 'CityDetail',
    timestamps: true,
  }
);


export { CityDetail };
