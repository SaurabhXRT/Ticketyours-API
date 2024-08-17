import { Model, DataTypes } from "sequelize";
import { centralDatabase } from "../../config/dbconfig.js";

class CinemaOperator extends Model {
  public id!: string;
  public name!: string;
  public city_name!: string;
  public email!: string;
  public passwordHash!: string;
  public phone!: string;
  public dob?: string;
  public profileImage?: string;
  public govIdType?: string;
  public govIdNumber?: string;
  public govIdImage?: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CinemaOperator.init(
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
    city_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
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
  },
  {
    sequelize: centralDatabase.getInstance(),
    modelName: "CinemaOperator",
    timestamps: true,
  }
);

export { CinemaOperator };
