import { Model, DataTypes } from 'sequelize';
import { centralDatabase } from "../../config/dbconfig.js";

class CinemaHallReview extends Model {}

CinemaHallReview.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    star: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reviewContent: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    cinemaHallId: {
      type: DataTypes.INTEGER,
      allowNull: true, 
    },
  },
  {
    sequelize: centralDatabase.getInstance(),
    modelName: 'CinemaHallReview',
    timestamps: true,
  }
);

export { CinemaHallReview };
