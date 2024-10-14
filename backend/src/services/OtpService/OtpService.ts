import { verificationModel } from "../../PGmodels/Verification/Verification.model.js";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv-flow";
import { Fast2smsService } from "../Messaging/Fast2smsService.js";

dotenv.config();
export class OtpService {
    async requestotp(mobile: string){
        const secret: any = process.env.JWT_SECRET;
        const token = jsonwebtoken.sign({mobile} , secret , {expiresIn: "30d"});
        let otp = Math.floor(100000 + Math.random() * 900000);
        // let message = `your ticketyours mobile verfication code is ${otp}`;
        const smsservice = new Fast2smsService();
        const result = await smsservice.sendFast2smsOtp(mobile,otp);
        if(result){
            const verification = await verificationModel.create({
                token: token,
                otp: otp
            });
            if(verification){
                return token;
            } else {
                return "error saving verfication"
            }
        } else {
            return "error sending otp";
        }

    }

    async verifyotp(token:string, otp: any){
        const verfication:any = await verificationModel.findOne({
            where: {
                token: token,
            }
        });
        if(!verfication){
            return "invalid token";
        }
        const isExpired = jsonwebtoken.decode(token);
        if(isExpired){
            return "token expired";
        }
        if(verfication.otp !== otp){
            return "invalid otp";
        }
        await verificationModel.destroy({
            where: {
                token: token,
            }
        });
        return true;
    }
}