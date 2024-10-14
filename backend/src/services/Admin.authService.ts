import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Admin } from '../PGmodels/Admin/Admin.js';
import { AdminLoginSession } from '../PGmodels/LoginSession/Admin.Loginsession.js';

export class AdminAuthService {
  async get(phone: string) {
    return await Admin.findOne({ where: { phone } });
  }

  async create(adminCredentials: any) {
    const newAdmin = await Admin.create({
      name: adminCredentials.name,
      email: adminCredentials.email,
      passwordHash: adminCredentials.password,
      phone: adminCredentials.phone,
    });
    return newAdmin;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async loginWithPassword(userCredentials: any) {
    let user = await this.get(userCredentials.phone);
    
    if (!user) {
      return "User not found";
    }
    user = user.toJSON();
    console.log(user);

    //const isPasswordCorrect = await this.comparePassword(userCredentials.password, user.passwordHash);
    const isPasswordCorrect = await bcrypt.compare(userCredentials.password, user.passwordHash);
    if (!isPasswordCorrect) {
      return "incorrect password";
    }

    const secret: string = process.env.JWT_SECRET!;
    const token = jwt.sign(
      { adminId: user.id },
      secret,
      {
        expiresIn: "30d",
      }
    );

    await AdminLoginSession.create({
      adminId: user.id,
      token: token,
    });

    return token; 
  }

  async logout(token: string) {
    const loginSession = await AdminLoginSession.findOne({ where: { token } });
    if (!loginSession) {
      return "Invalid token";
    }

    await AdminLoginSession.destroy({ where: { token } });
    return "Logout successful";
  }
}
