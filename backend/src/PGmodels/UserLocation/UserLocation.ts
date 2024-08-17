import { DataTypes, Model } from "sequelize";
import { centralDatabase } from "../../config/dbconfig.js";

class UserLocationsModel extends Model { }
//  only cities are listed
UserLocationsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    CityName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
  },
  {
    modelName: "UserLocation",
    sequelize: centralDatabase.getInstance(),
    timestamps: true,
  }
);

export default UserLocationsModel;

