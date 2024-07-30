//import { Request, Response, NextFunction } from 'express';
import UserModel from '../../models/User.js';

export class UserMiddleware {
    static async isUser(req: any, res: any, next: any) {
        try {
            const user = await UserModel.findById(req.userId);
            if (!user) {
                return res.status(401).send("Unauthorized: User not found");
            }
            req.user = user;
            next();
        } catch (error) {
            return res.status(401).send("Unauthorized: User verification failed");
        }
    }
}
