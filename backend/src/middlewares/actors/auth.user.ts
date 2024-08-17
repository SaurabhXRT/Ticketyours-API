import { User } from '../PGmodels/User/User.js';

export class UserMiddleware {
    static async isUser(req: any, res: any, next: any) {
        try {
            const user = await User.findByPk(req.userId);
            if (!user) {
                return res.status(401).send("Unauthorized: User not found");
            }
            req.user = user;
            next();
        } catch (error) {
            console.error("Error verifying user:", error);
            return res.status(401).send("Unauthorized: User verification failed");
        }
    }
}
