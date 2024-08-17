import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CinemaOperator } from '../PGmodels/Operator/Operator.js'; 
import { OperatorLoginSession } from '../PGmodels/LoginSession/Operator.Loginsession.js';

export class OperatorAuthService {
  async get(phone: string) {
    return await CinemaOperator.findOne({ where: { phone } });
  }

  async create(operatorCredentials: any) {
    const newOperator = await CinemaOperator.create({
      name: operatorCredentials.name,
      email: operatorCredentials.email,
      passwordHash: operatorCredentials.password,
      phone: operatorCredentials.phone,
    });
    return newOperator;
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
      { operatorId: user.id },
      secret,
      {
        expiresIn: "30d",
      }
    );

    await OperatorLoginSession.create({
      operatorId: user.id,
      token: token,
    });

    return token; 
  }

  async logout(token: string) {
    const loginSession = await OperatorLoginSession.findOne({ where: { token } });
    if (!loginSession) {
      return "Invalid token";
    }

    await OperatorLoginSession.destroy({ where: { token } });
    return "Logout successful";
  }
}
