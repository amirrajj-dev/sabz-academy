import type { NextFunction, Request , Response } from "express";
import prisma from "../../utils/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const emailReg = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

export const signup = async (req: Request, res: Response , next : NextFunction) => {
  try {
    const { username, email, password, name, phone } = req.body;
    if (
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !name.trim() ||
      !phone.trim()
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all fields", success: false });
    }
    if (!emailReg.test(email)) {
      return res.status(400).json({ message: "Invalid email", success: false });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({
          message: "Password must be at least 6 characters long",
          success: false,
        });
    }
    const isUserExist = await prisma.user.findFirst({
      where: {
        OR: [{ username: username.trim() }, { email: email.trim() }],
      },
    });
    if (isUserExist) {
      return res
        .status(400)
        .json({ message: "user already exists", success: false });
    }
    const users = await prisma.user.findMany()
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username: username.trim(),
        email: email.trim(),
        password: hashedPassword,
        name: name.trim(),
        phone: phone.trim(),
        role : users.length > 0 ? 'USER' : 'ADMIN'
      },
    });
    if (!user) {
      return res
        .status(500)
        .json({ message: "sth gose wrong creating the user", success: false });
    }
    if (typeof process.env.JWT_SECRET !== "string") return;
    const token = await jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("sabz-token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      path: "/",
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
    });
    const { password: _, role: __, phone: ___, updatedAt : ____,  ...newUser } = user;
    return res.status(200).json({ message: "User created successfully", success: true , user : newUser });
  
  } catch (error) {
    next(error)
  }
};

export const signin = async (req: Request, res: Response , next : NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email.trim() ||!password.trim()) {
      return res
       .status(400)
       .json({ message: "Please fill all fields", success: false });
    }
    if (!emailReg.test(email)) {
      return res.status(400).json({ message: "Invalid email", success: false });
    }
    const user = await prisma.user.findFirst({
      where : {
        email
      }
    })
    if (!user) {
      return res
       .status(404)
       .json({ message: "User not found", success: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
       .status(401)
       .json({ message: "Invalid password", success: false });
    }
    if (typeof process.env.JWT_SECRET!== "string") return;
    const token = await jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.cookie("sabz-token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      path: "/",
      secure: process.env.NODE_ENV!== "development",
      sameSite: "strict",
    })
    const { password: _, role: __, phone: ___, updatedAt : ____,...newUser } = user;
    return res.status(200).json({ message: "User logged in successfully", success: true, user : newUser });
  } catch (error) {
    next(error)
  }
};

export const signout = async (req: Request, res: Response , next : NextFunction) => {
  try {
    const token = req.cookies["sabz-token"];
    if (!token) {
      return res.status(200).json({ message: "No token provided", success: false });
    }
    res.clearCookie("sabz-token", { path: "/" , maxAge : 0 });
    return res.status(200).json({ message: "User logged out successfully", success: true });
  } catch (error) {
    next(error)
  }
};

export const getMe = async (req: Request, res: Response , next : NextFunction)=>{
  try {
    const user = req.user
    if (!user) {
      return res.status(401).json({ message: "User not authenticated", success: false });
    }
    return res.status(200).json({
      message: "User fetched successfully",
      success: true,
      user
    })
  } catch (error) {
    next(error)
  }
}