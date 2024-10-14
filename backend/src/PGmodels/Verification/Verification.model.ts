import { Model, DataTypes } from "sequelize";
import { centralDatabase } from "../../config/dbconfig.js";

export class verificationModel extends Model {}

verificationModel.init(
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: centralDatabase.getInstance(),
    modelName: "verification",
    timestamps: true,
    createdAt: true,
    updatedAt: false,
  }
);
