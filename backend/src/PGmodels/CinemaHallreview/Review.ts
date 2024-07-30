import { Model, DataTypes } from 'sequelize';
import { centralDatabase } from "../../config/dbconfig.js";

class CinemaHallReview extends Model {}

CinemaHallReview.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
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
      type: DataTypes.UUID,
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
