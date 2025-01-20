import { Request, Response } from "express";
import userService from "./userService";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;
    const result = await userService.signUp({ email, username, password });
    res.status(201).json({ message: "User created successfully", data: result });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { emailOrUsername, password } = req.body;
    const token = await userService.login({ emailOrUsername, password });
    res.status(200).json({ message: "Login successful", token });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

export default { signUp, login };
