import { Model, DataTypes } from 'sequelize';
import { centralDatabase } from "../../config/dbconfig.js";

class MovieInTheatre extends Model {}

MovieInTheatre.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    posterUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    releaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: centralDatabase.getInstance(),
    modelName: 'MovieInTheatre',
    timestamps: true,
  }
);

export { MovieInTheatre };
