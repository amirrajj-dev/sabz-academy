import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../utils/prisma";

interface ICourse {
  id: string;
  name: string;
  description: string;
  cover?: string;
  support?: string;
  shortName: string;
  price: number;
  isComplete: number;
  status: string;
  createdAt: Date;
}

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string;
        name: string;
        role : string;
        email: string;
        username: string;
        courses : any[];
        phone : string
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
      select: { id: true, name: true, role : true , email: true, username: true, createdAt: true , phone : true , courses : true },
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

export const protectRouteAdmin = async (req : Request , res : Response , next : NextFunction) => {
  try {
    const token = req.cookies["sabz-token"];
    if (!token) {
      return res.status(401).json({ message: "Not authorized, token missing", success: false });
    }
    
    if (typeof process.env.JWT_SECRET!== "string") {
      throw new Error("JWT_SECRET is not defined");
    }
    
    const {userId}= jwt.verify(token, process.env.JWT_SECRET) as { userId: string };
    if (!userId){
      return res.status(401).json({ message: "Not authorized, invalid token", success: false });
    }
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, username: true, createdAt: true, role: true , phone: true , courses: true },
    });
    
    if (!user) {
      return res.status(401).json({ message: "Not authorized, user not found", success: false });
    }
    
    if (user.role!== "ADMIN") {
      return res.status(403).json({ message: "Not authorized, you are not an admin", success: false });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Not authorized", success: false });
  }
}