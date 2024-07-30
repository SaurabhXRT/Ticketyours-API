//import logger from "../logger/logger.js";
import { UserService } from "./UserService.js";
import UserModel from "../models/User";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
// import dotenv from "dotenv-flow";
// dotenv.config();
import { LoginSession } from "../PGmodels/LoginSession/Loginsession.js";

interface UserVerifyData {
  phone: string;
}
const userService = new UserService();

export class AuthService {
  //const userservice = new UserService();

  // login user with passsowrd and email
  async loginWithPassword(data: any) {
    // check if user exists
    const user: any = await userService.get(data.phone);
    if (user === null) {
      return "User not found";
    }
    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(data.password, user.password);
    if (!isPasswordCorrect) {
      return "incorrect password";
    };

    // generate token
    const secrect: any = process.env.JWT_SECRET;
    const token = jsonwebtoken.sign(
      { id: user.id },
      secrect,
      {
        expiresIn: "30d",
      },
    );
    // save token to db
    const loginSession = await LoginSession.create({
      userId: user.id,
      token: token,
    });
    return loginSession;
  }

  
  // logout user
  async logout(token: string) {
    const loginSession: any = await LoginSession.findOne({
      where: {
        token: token,
      }
    });
    if (loginSession === null) {
      return "Invalid token";
    }
    await LoginSession.destroy({
      where: {
        token: token,
      }
    });
    return "Logout successfull";
  }
}