import { Request, Response } from "express";
import * as authService from "../services/authService";
import { UserDto } from "../dtos/userDto";
import { RegisterDto } from "../dtos/registerDto";

export const signup = async (req: Request, res: Response) => {
  try {
    const token = await authService.register(req.body as RegisterDto);
    res.status(201).json({ token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const token = await authService.login(req.body as UserDto);
    res.status(200).json({ message: "Authentication successful", token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
