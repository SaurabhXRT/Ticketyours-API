import express  from "express";
import {sendOtpTophone,verifyOtp } from "../controllers/otpcontroller.js";
const router = express.Router();

router.post("/requestotp", sendOtpTophone);
router.post("/verifyotp", verifyOtp);
export default router;