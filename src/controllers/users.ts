import User from "@models/User";
import { Request, Response } from "express";

export const getAllUsersController = async (req: Request, res: Response) => {
  const users = await User.find();
  return res.status(200).json({ data: users });
};

export const getUserInformationController = async (req: Request, res: Response) => {
  const { _id } = req.user as { _id: string };
  const user = await User.findOne({ _id }).select(["-password", "-updatedAt", "-createdAt"]);

  res.status(200).json({ data: user });
};
