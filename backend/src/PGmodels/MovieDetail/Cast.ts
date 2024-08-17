import { Model, DataTypes } from 'sequelize';
import { centralDatabase } from "../../config/dbconfig.js";

class Cast extends Model {
   
}

Cast.init(
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
    modelName: 'Cast',
    timestamps: true,
  }
);

export { Cast };
