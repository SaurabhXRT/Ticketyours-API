import { DataTypes, Model } from "sequelize";
import { centralDatabase } from "../../config/dbconfig.js";

export class OperatorLoginSession extends Model {}

OperatorLoginSession.init(
  {
    operatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: centralDatabase.getInstance(),
    timestamps: true,
    modelName: 'OperatorLoginSession',
    createdAt: true,
  }
);
