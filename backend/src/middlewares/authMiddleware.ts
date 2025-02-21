import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../utils/prisma";

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string;
        name: string;
        email: string;
        username: string;
        createdAt: Date;
      };
    }
  }
}

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["sabz-token"];
    if (!token) {
      return res.status(401).json({ message: "Not authorized, token missing", success: false });
    }

    if (typeof process.env.JWT_SECRET !== "string") {
      throw new Error("JWT_SECRET is not defined");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string };
    
    if (!decoded?.userId) {
      return res.status(401).json({ message: "Not authorized, invalid token", success: false });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, name: true, email: true, username: true, createdAt: true },
    });

    if (!user) {
      return res.status(401).json({ message: "Not authorized, user not found", success: false });
    }

    req.user = user;
    next();
    
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Not authorized", success: false });
  }
};