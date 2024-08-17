import { Model, DataTypes } from 'sequelize';
import { centralDatabase } from "../../config/dbconfig.js";

class Crew extends Model {}

Crew.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: centralDatabase.getInstance(),
    modelName: 'Crew',
    timestamps: true,
  }
);

export { Crew };
