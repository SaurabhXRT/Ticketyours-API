import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv-flow';
import { UserLoginSession } from '../PGmodels/LoginSession/User.Loginsession.js';
import { OperatorLoginSession } from '../PGmodels/LoginSession/Operator.Loginsession.js';
// import { User } from '../PGmodels/User/User.js';
// import { CinemaOperator } from '../PGmodels/Operator/Operator.js';

dotenv.config();

interface CustomJwtPayload extends JwtPayload {
    userId?: string;
    operatorId?: string;
}

export class AuthMiddleware {
    static async verifyToken(req: any, res: any, next: any) {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).send("Unauthorized");
        }
        try {
            const isValid = await AuthMiddleware.validateToken(token);
            if (!isValid) {
                return res.status(401).send("Invalid token");
            }

            const { userId, operatorId } = await AuthMiddleware.getActorIdFromToken(token);
            if (userId) {
                req.userId = userId;
            } else if (operatorId) {
                req.operatorId = operatorId;
            } else {
                return res.status(401).send("Unauthorized");
            }

            next();
        } catch (error) {
            console.error("Token verification error:", error);
            return res.status(401).send("Unauthorized");
        }
    }

    static async validateToken(token: string) {
        try {
            const secret: string = process.env.JWT_SECRET!;
            jwt.verify(token, secret);
            return true;
        } catch (error) {
            console.error("Token validation error:", error);
            return false;
        }
    }

    static async getActorIdFromToken(token: string) {
        try {
            const secret: string = process.env.JWT_SECRET!;
            const decoded = jwt.verify(token, secret) as CustomJwtPayload;
            console.log(decoded);

            let loginSession: UserLoginSession | OperatorLoginSession;
            if (decoded.userId) {
                loginSession = await UserLoginSession.findOne({
                    where: {
                        userId: decoded.userId,
                        token: token,
                    }
                });
                if (loginSession) {
                    return { 
                        userId: decoded.userId 
                    };
                }
            } else if (decoded.operatorId) {
                loginSession = await OperatorLoginSession.findOne({
                    where: {
                        operatorId: decoded.operatorId,
                        token: token,
                    }
                });
                if (loginSession) {
                    return {
                         operatorId: decoded.operatorId 
                        };
                }
            }

            console.log('Login session not found');
            return {};
        } catch (error) {
            console.error("Get ID from token error:", error);
            return {};
        }
    }
}
