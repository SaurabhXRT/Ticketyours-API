import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CinemaOperator from "../models/Cinema_operator.js";
import jsonwebtoken from "jsonwebtoken";
import LoginSession from "../models/Loginsession.js";

export class OperatorAuthService {
  async get(phone: string) {
    return await CinemaOperator.findOne({ phone });
  }

  async create(operatorCredentials: any) {
    const newOperator = new CinemaOperator({
      name: operatorCredentials.name,
      email: operatorCredentials.email,
      password_hash: operatorCredentials.password,
      phone: operatorCredentials.phone,
      cinema_halls: [],
    });

    return await newOperator.save();
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async loginWithPassword(userCredentials: any) {
    const user = await this.get(userCredentials.phone);
    if (!user) {
      return "User not found";
    }

    const isPasswordCorrect = await this.comparePassword(userCredentials.password, user.password_hash);
    if (!isPasswordCorrect) {
      return "incorrect password";
    }

    const secrect: any = process.env.JWT_SECRET;
    const token = jsonwebtoken.sign(
      { id: user._id },
      secrect,
      {
        expiresIn: "30d",
      },
    );
    // save token to db
    const loginSession = await LoginSession.create({
      userId: user._id,
      token: token,
    });
    return loginSession;
  }

  async logout(token: string) {
    const loginSession: any = await LoginSession.findOne({ token: token });
    if (loginSession === null) {
      return "Invalid token";
    }

    await LoginSession.deleteOne({ token: token });
    return "Logout successful";
  }
}
