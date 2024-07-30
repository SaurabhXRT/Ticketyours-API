import { Model, DataTypes } from 'sequelize';
import { centralDatabase } from '../../config/dbconfig.js';

class CinemaOperator extends Model {}

CinemaOperator.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true, 
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    govIdType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    govIdNumber: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    govIdImage: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: centralDatabase.getInstance(),
    modelName: 'CinemaOperator',
    timestamps: true,
  }
);

export { CinemaOperator };
