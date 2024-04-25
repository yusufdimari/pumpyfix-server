import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import User, { validateLogin, validateSignup } from "@models/User";
import { Request, Response } from "express";
import Worker from "@models/Worker";

export const userLoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { error } = validateLogin(req.body);
  if (error) return res.status(400).json({ error: { message: error.details[0].message } });

  const user = await User.findOne({ email }).select(["-updatedAt", "-createdAt"]);
  if (!user) return res.status(400).json({ error: { message: "User not found" } });

  const passwordMatches = await bcryptjs.compare(password, user.password);
  if (!passwordMatches) return res.status(400).json({ error: { message: "Invalid password" } });

  const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, `${process.env.JWT_SECRET}`);

  res.status(200).json({ token });
};

export const userSignupController = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, isAdmin, phoneNumber } = req.body;

  const { error } = validateSignup(req.body);
  if (error) return res.status(400).json({ error: { message: error?.details[0].message } });

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ error: { message: "User already exists." } });

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  const user = await User.create({ firstName, lastName, email, phoneNumber, password: hashedPassword, isAdmin });
  user.save();

  res.status(201).json({ data: user });
};

export const workerLoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { error } = validateLogin(req.body);
  if (error) return res.status(400).json({ error: { message: error.details[0].message } });

  const user = await Worker.findOne({ email }).select(["-updatedAt", "-createdAt"]);
  if (!user) return res.status(400).json({ error: { message: "Worker not found" } });

  const passwordMatches = await bcryptjs.compare(password, user.password);
  if (!passwordMatches) return res.status(400).json({ error: { message: "Invalid password" } });

  const token = jwt.sign({ _id: user._id }, `${process.env.JWT_SECRET}`);

  res.status(200).json({ token });
};
