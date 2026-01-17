import { Request, Response } from "express";
import * as authServices from "./auth.service";

export const register = async (req: Request, res: Response) => {
  const user = await authServices.register(req.body);
  res.status(201).json(user);
};

export const login = async (req: Request, res: Response) => {
  const token = await authServices.login(req.body.email, req.body.password);
  res.json(token);
};
