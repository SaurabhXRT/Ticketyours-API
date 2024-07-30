import express from "express";
//import CinemaOperator from "@/src/models/Cinema_operator.js";
import {OperatorAuthService} from "../../services/Operator.AuthService.js";
import { Request, Response } from 'express';
const router = express.Router();

const service = new OperatorAuthService();

export const register = async (req: any, res: any) => {
  const body = req.body;
  const operatorCredentials = {
    name: body.name,
    email: body.email,
    password: body.password as string,
    phone: body.phone
  };

  // If there is no name or email provided then reject the request.
  if (!(body.name || body.email)) {
    return res.status(400).json({
      code: "fields/empty-primary-field",
      message: "One of the fields is required - Email, Username",
    });
  }
  
  try {
    // Check if user with the same mobile number exists
    const existingUser = await service.get(operatorCredentials.phone);
    if (existingUser) {
      return res.status(400).json({
        code: "auth/user-exists",
        message: "User with this mobile number already exists",
      });
    }

    // Hash password
    const hashedPassword = await service.hashPassword(operatorCredentials.password);
    operatorCredentials.password = hashedPassword;

    // Create user
    const user = await service.create(operatorCredentials);

    res.status(200).json({
      code: "auth/success",
      message: "User registered successfully",
      data: user
    });

  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      code: "server/internal-error",
      message: "An internal server error occurred while creating your account.",
    });
  }
}

export const login = async (req: any, res: any) => {

    const body = req.body;
    var userCredentials = {
      phone: body.phone,
      password: body.password as string,
    };
    
    // If there is no username or email provided then reject the request.
    if (!(body.phone|| body.password)) {
      res
        .status(400)
        .send({
          code: "fields/empty-primary-field",
          message: "One of the fields is required - phone , password",
        });
      return;
    }
  
    try {
      //Verify a user
      let user = await service.loginWithPassword(userCredentials);
  
      // If user does not exists send a user not found message.
      if (user === "User not found") {
        res
          .status(404)
          .send({
            code: "auth/user-not-found",
            message: "User not found",
          });
        return
      } else if (user === "incorrect password") {
        res
          .status(401)
          .send({
            code: "auth/wrong-password",
            message: "Wrong password",
          });
        return
      }
      res.status(200).json({
        code: "auth/success",
        message: "User logged in successfully",
        data: user
      });
  
    } catch (error) {
      //logger.error(error);
      console.log(error);
      res
        .status(500)
        .send({
          code: "server/internal-error",
          message: "An internal server error occured while login using phone",
        });
    }
  };
  
  // logout 
  export const logout =  async (req:any , res:any) => {
    let token: any = req.headers.authorization;
    if (!token) {
      res.status(400).send({
        code: "auth/invalid-token",
        message: "Invalid token"
      })
    }
    try {
      let user = await service.logout(token);
      if (user == "Invalid token") {
        res.status(400).send({ code: "field/invalid-token", message: "Invalid token" })
        return
      } else if (user == "Error saving login session") {
        res.status(500).send({ code: "server/internal-error", message: "An internal server error occured while saving login session" })
        return
      } else {
        res.status(200).send({ code: "auth/success", message: "User logged out successfully" })
        return
      }
  
    } catch (error) {
      //logger.error(error);
      res
        .status(500)
        .send({
          code: "server/internal-error",
          message: "An internal server error occured",
        });
    }
  };
  

export default router;
