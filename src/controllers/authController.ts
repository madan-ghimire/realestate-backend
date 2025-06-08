import { Request, Response } from "express";
import * as authService from "../services/authService";
import { UserDto } from "../dtos/userDto";
import { RegisterDto } from "../dtos/registerDto";
import { prismaErrorHandler } from "../utilites/prismaErrorHandler";

export const signup = async (req: Request, res: Response) => {
  try {
    const token = await authService.register(req.body as RegisterDto);
    res.status(201).json({ token, success: true });
  } catch (error: any) {
    const handled = prismaErrorHandler(error);
    console.log("check error handled", handled);
    res.status(400).json({ message: handled.message });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const token = await authService.login(req.body as UserDto);
    res
      .status(200)
      .json({ message: "Authentication successful", token, success: true });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
