import { Model, DataTypes } from 'sequelize';
import { centralDatabase } from "../../config/dbconfig.js";

class Admin extends Model {}

Admin.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: centralDatabase.getInstance(),
    modelName: 'Admin',
    timestamps: true,
  }
);

export { Admin };
