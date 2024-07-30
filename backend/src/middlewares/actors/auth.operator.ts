//import { Request, Response, NextFunction } from 'express';
import OperatorModel from '../../models/Cinema_operator.js';

export class OperatorMiddleware {
    static async isOperator(req: any, res: any, next: any) {
        try {
            const operator = await OperatorModel.findById(req.userId);
            if (!operator) {
                return res.status(401).send("Unauthorized: Operator not found");
            }
            req.operator = operator;
            next();
        } catch (error) {
            return res.status(401).send("Unauthorized: Operator verification failed");
        }
    }
}
