import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const verifyAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ error: { message: "Access denied. No token provided" } });

  try {
    const user = await jwt.verify(token, `${process.env.JWT_SECRET}`);
    req.user = user;
    next();
  } catch (err: unknown) {
    res.status(400).json({ error: { message: "Invalid token." } });
  }
};

export default verifyAuth;
