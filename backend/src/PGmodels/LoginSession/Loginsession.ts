import { DataTypes, Model } from "sequelize";
import { centralDatabase } from "../../config/dbconfig.js";

export class LoginSession extends Model {

}

LoginSession.init({
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: DataTypes.STRING(128),
        allowNull: false,
    }

}, {
    sequelize: centralDatabase.getInstance(),
    timestamps: true,
    createdAt: true,
    updatedAt: false,
});