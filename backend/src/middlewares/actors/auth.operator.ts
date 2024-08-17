import { CinemaOperator } from '../../PGmodels/Operator/Operator.js';

export class OperatorMiddleware {
    static async isOperator(req: any, res: any, next: any) {
        try {
            const operator = await CinemaOperator.findByPk(req.operatorId);
            if (!operator) {
                return res.status(401).send("Unauthorized: Operator not found");
            }
            req.operator = operator;
            next();
        } catch (error) {
            console.error("Error verifying operator:", error);
            return res.status(401).send("Unauthorized: Operator verification failed");
        }
    }
}
