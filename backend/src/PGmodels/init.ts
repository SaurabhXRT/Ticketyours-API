import { Database, DbOptions } from "../database/database.js";
import dotenv from "dotenv-flow";
dotenv.config();
import logger from "../logger/logger.js";
import { User } from "./User/User.js";
import { City } from "./City/Citymodel.js";
import { LoginSession } from "./LoginSession/Loginsession.js";

export async function initDatabase(db: Database, dbOptions: DbOptions) {
    await db.initInstance(dbOptions);
    await User.sync({ force: true });
    logger.log("user model initiated successfully");
    await City.sync();
    logger.log("city model initiated successfully");
    await LoginSession.sync();
    logger.log("loginsession model initiated successfully");

    User.hasMany(LoginSession, { 
        foreignKey: 'userId', 
        as: 'loginSessions' 
    });
    LoginSession.belongsTo(User, { 
        foreignKey: 'userId', 
        as: 'user' 
    });

}