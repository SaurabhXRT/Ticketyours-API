import { OtpService } from "../services/OtpService/OtpService.js";
const service = new OtpService();
export const sendOtpTophone = async (req: any, res: any) => {
  // #swagger.description = 'send otp to mobilenumber'
  try {
    const mobile = req.body.mobile;
    if (!mobile) {
      return res.status(400).json({
        code: "otp/require-field",
        message: "mobile number is required",
      });
    }
    const token = await service.requestotp(mobile);
    if (token === "invalid mobile number") {
      return res.status(400).json({
        code: "otp/invalid-mobilenumber",
        message: "Invalid mobile number.",
      });
    } else if (token === "error sending otp") {
      return res.status(500).json({
        otp: "otp/error-sending-otp",
        message: "Error sending OTP. Please try again.",
      });
    } else if (token === "error saving verification") {
      return res.status(500).json({
        code: "otp/error-saving-verification",
        message: "Error saving verification data.",
      });
    }

    res.status(200).json({
      code: "otp/send-successfull",
      message: "OTP sent successfully.",
      data: token,
    });
  } catch (error) {
    console.log(error);
    if(error.message.includes("error while sending otp")){
        return res.status(500).json({
            code: "otp/otpservice-error",
            message: "otp service provider error",
            error: error.message,
        });
    }
  }
};

export const verifyOtp = async (req: any, res: any) => {
  // #swagger.description = 'verify the otp which has been sent to mobile number it require token'
  try {
    const { token, otp } = req.body;
    if (!token || !otp) {
      return res.status(400).json({
        code: "otp/required-field-empty",
        message: "token and otp are required",
      });
    }
    const result = await service.verifyotp(token, otp);
    if (result === true) {
      return res.status(200).json({
        code: "otp/verified-successfully",
        message: "OTP verified successfully.",
      });
    } else if (result === "token expired") {
      return res.status(401).json({
        code: "otp/verified-successfully",
        message: "Token expired. Please request a new OTP.",
      });
    } else if (result === "invalid otp") {
      return res.status(401).json({
        code: "otp/invalid-otp",
        message: "Invalid OTP. Please try again.",
      });
    } else if (result === "invalid token") {
      return res.status(401).json({
        code: "otp/invalid-token",
        message: "Invalid token. Please request a new OTP.",
      });
    }

    res.status(500).json({
      code: "otp/error-otp-verification",
      message: "An error occurred. Please try again.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: "otp/error-otp-verification",
      message: "An error occurred. Please try again.",
    });
  }
};
