import { Admin } from "../../PGmodels/Admin/Admin.js";

export class AdminMiddleware {
    static async isAdmin(req: any, res: any, next: any) {
        try {
            const admin = await Admin.findByPk(req.adminId);
            if (!admin) {
                return res.status(401).send("Unauthorized: admin not found");
            }
            req.admin = admin;
            next();
        } catch (error) {
            console.error("Error verifying admin:", error);
            return res.status(401).send("Unauthorized: admin verification failed");
        }
    }
}
