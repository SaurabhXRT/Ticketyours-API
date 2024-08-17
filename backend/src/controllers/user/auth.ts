import express from "express";
import { UserService } from "../../services/UserService.js";
import { AuthService } from "../../services/AuthService.js";
import logger from "../../logger/logger.js";
import { Request, Response } from 'express';
const router = express.Router();


export const register = async (req: any, res: any) => {
   // #swagger.description = 'Register a new user'
  const body = req.body;
  const userCredentials = {
    name: body.name,
    email: body.email,
    username: body.username,
    password: body.password as string,
    phone: body.phone
  };

  if (!(body.name || body.email)) {
    return res.status(400).json({
      code: "fields/empty-primary-field",
      message: "One of the fields is required - Email, Username",
    });
  }
  const userService = new UserService();
  try {
    const existingUser = await userService.get(userCredentials.phone);
    if (existingUser) {
      return res.status(400).json({
        code: "auth/user-exists",
        message: "User with this mobile number already exists",
      });
    }

   
    const hashedPassword = await userService.hashPassword(userCredentials.password);
    userCredentials.password = hashedPassword;

  
    const user = await userService.create(userCredentials);

    res.status(200).json({
      code: "auth/success",
      message: "User registered successfully",
      data: user
    });

  } catch (error) {
    console.error("Error registering user:", error);
    logger.log("Error registering user:", error);
    res.status(500).json({
      code: "server/internal-error",
      message: "An internal server error occurred while creating your account.",
    });
  }
}

export const login = async (req: any, res: any) => {
    // #swagger.description = 'login with phone and password for a user' 
    const body = req.body;
    var userCredentials = {
      phone: body.phone,
      password: body.password as string,
    };
    const authService = new AuthService();
  
  
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
    
      let user = await authService.loginWithPassword(userCredentials);
  
    
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
      logger.error(error);
      console.log(error);
      res
        .status(500)
        .send({
          code: "server/internal-error",
          message: "An internal server error occured while login using phone",
        });
    }
  };
  
  
  export const logout =  async (req:any , res:any) => {
    // #swagger.description = 'logout a user'
    let token: any = req.headers.authorization;
    if (!token) {
      res.status(400).send({
        code: "auth/invalid-token",
        message: "Invalid token"
      })
    }
    try {
      let authService = new AuthService();
      let user = await authService.logout(token);
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
      logger.error(error);
      res
        .status(500)
        .send({
          code: "server/internal-error",
          message: "An internal server error occured",
        });
    }
  };
  

export default router;
