//import logger from "../logger/logger.js";
import { UserService } from "./UserService.js";
import UserModel from "../models/User";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
// import dotenv from "dotenv-flow";
// dotenv.config();
import { UserLoginSession } from "../PGmodels/LoginSession/User.Loginsession.js";

interface UserVerifyData {
  phone: string;
}
const userService = new UserService();

export class AuthService {
  //const userservice = new UserService();

  async loginWithPassword(data: any) {
    const user: any = await userService.get(data.phone);
    if (user === null) {
      return "User not found";
    }
    const isPasswordCorrect = await bcrypt.compare(data.password, user.password);
    if (!isPasswordCorrect) {
      return "incorrect password";
    };
    const secrect: any = process.env.JWT_SECRET;
    const token = jsonwebtoken.sign(
      { id: user.id },
      secrect,
      {
        expiresIn: "30d",
      },
    );
    const loginSession = await UserLoginSession.create({
      userId: user.id,
      token: token,
    });
    return loginSession;
  }

  async logout(token: string) {
    const loginSession: any = await UserLoginSession.findOne({
      where: {
        token: token,
      }
    });
    if (loginSession === null) {
      return "Invalid token";
    }
    await UserLoginSession.destroy({
      where: {
        token: token,
      }
    });
    return "Logout successfull";
  }
}