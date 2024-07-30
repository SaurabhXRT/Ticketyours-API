import { User } from "../PGmodels/User/User.js";
import bcrypt from "bcrypt";

export class UserService {
  async create(data: any) {
    try {
      const user = await User.create({
        ...data,
      });
      return user ? user.toJSON() : null;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async get(mobile: string) {
    try {
      const user = await User.findOne({ where: { phone: mobile } });
      return user ? user.toJSON() : null;
    } catch (error) {
      console.error("Error fetching user by mobile:", error);
      throw error;
    }
  }

  async getUserById(userId: string) {
    try {
      const user = await User.findByPk(userId);
      return user ? user.toJSON() : null;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  }

  async hashPassword(password: string) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      return hashedPassword;
    } catch (error) {
      console.error("Error hashing password:", error);
      throw error;
    }
  }
}
