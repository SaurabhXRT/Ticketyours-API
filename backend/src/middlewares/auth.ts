//import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv-flow';
import LoginSession from '../models/Loginsession.js';
import User from '../models/User.js';

dotenv.config();

export class AuthMiddleware {
    static async verifyToken(req: any, res: any, next: any) {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).send("Unauthorized");
        }
        try {
            const isValid = await AuthMiddleware.validateToken(token);
            if (!isValid) {
                return res.status(401).send("Unauthorized");
            }
            const userId = await AuthMiddleware.getUserIdFromToken(token);
            // let checkIdMobileVerified = await AuthMiddleware.isMobileVerified(userId);
            // if (!checkIdMobileVerified) {
            //     return res.status(403).send("Mobile not verified");
            // }
            req.userId = userId;
            next();

        } catch (error) {
            return res.status(401).send("Unauthorized");
        }


    }

    static async validateToken(token: string) {
        try {
            const secrect: any = process.env.JWT_SECRET;
            const decoded: any = jwt.verify(token, secrect);
            const loginSession = await LoginSession.findOne({
                where: {
                    userId: decoded.id,
                    token: token,
                }
            });
            return loginSession === null ? false : true;
        } catch (error) {
            return false;
        }

    }

    static async getUserIdFromToken(token: string) {
        try {
            const secrect: any = process.env.JWT_SECRET;
            const decoded: any = jwt.verify(token, secrect);
            return decoded.id;
        } catch (error) {
            return false;
        }
    }

    private static async isMobileVerified(userId: string) {
        let check = await User.findOne({
            where: {
                userId: userId,
                isPhoneVerified: true
            }
        });

        if (check !== null) {
            return true;
        }
        return false;
    }
}
