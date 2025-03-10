import type { NextFunction, Request, Response } from "express";
import prisma from "../../utils/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const emailReg = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
      return res.status(400).json({
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
    const users = await prisma.user.findMany();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username: username.trim(),
        email: email.trim(),
        password: hashedPassword,
        name: name.trim(),
        phone: phone.trim(),
        role: users.length > 0 ? "USER" : "ADMIN",
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
    const {
      password: _,
      role: __,
      phone: ___,
      updatedAt: ____,
      ...newUser
    } = user;
    return res
      .status(200)
      .json({
        message: "User created successfully",
        success: true,
        user: newUser,
      });
  } catch (error) {
    next(error);
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email.trim() || !password.trim()) {
      return res
        .status(400)
        .json({ message: "Please fill all fields", success: false });
    }
    if (!emailReg.test(email)) {
      return res.status(400).json({ message: "Invalid email", success: false });
    }
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    if (user.isBanned) {
      return res
        .status(403)
        .json({ message: "User is banned", success: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Invalid password", success: false });
    }
    if (typeof process.env.JWT_SECRET !== "string") return;
    const token = await jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.cookie("sabz-token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      path: "/",
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
    });
    const {
      password: _,
      role: __,
      phone: ___,
      updatedAt: ____,
      ...newUser
    } = user;
    return res
      .status(200)
      .json({
        message: "User logged in successfully",
        success: true,
        user: newUser,
      });
  } catch (error) {
    next(error);
  }
};

export const signout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["sabz-token"];
    if (!token) {
      return res
        .status(200)
        .json({ message: "No token provided", success: false });
    }
    res.clearCookie("sabz-token", { path: "/", maxAge: 0 });
    return res
      .status(200)
      .json({ message: "User logged out successfully", success: true });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not authenticated", success: false });
    }
    return res.status(200).json({
      message: "User fetched successfully",
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  }
});

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    if (!email.trim()) {
      return res
        .status(400)
        .json({ message: "email is required", success: false });
    }
    if (!emailReg.test(email)) {
      return res.status(400).json({ message: "invalid email", success: false });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.trim() },
    });
    if (!user) {
      return res
        .status(404)
        .json({ message: "user not found", success: false });
    }

    if (typeof process.env.JWT_SECRET !== "string") return;
    const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry: new Date(Date.now() + 3600000),
      },
    });

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "درخواست بازیابی پسورد",
      html: `
        <p>شما درخواست بازیابی پسورد کردید لطفا جهت بازیابی پسورد بر روی لینک زیر کلیک کنید:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>این لینک تا یک ساعت دیگر منقضی می شود.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      message: "Password reset email sent successfully",
      success: true,
      token: resetToken,
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password.trim()) {
      return res
        .status(400)
        .json({ message: "Password is required", success: false });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({
          message: "Password must be at least 6 characters",
          success: false,
        });
    }

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: { gt: new Date() },
      },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "invalid or expired token", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return res.status(200).json({
      message: "Password reset successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user
    if (!user){
      return res.status(401).json({ message: "Unauthorized", success: false });
    }
    const { oldPassword, newPassword } = req.body;
    const currentUser = await prisma.user.findFirst({
      where : {
        username : user.username
      }
    })
    if (!currentUser){
      return res.status(404).json({ message: "User not found", success: false });
    }
    const isValid = await bcrypt.compare(oldPassword , currentUser?.password)
    if (!isValid){
      return res.status(400).json({ message: "Invalid old password", success: false });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        password: hashedPassword,
      }
    })
    return res.status(200).json({
      message: "Password changed successfully",
      success: true,
    })
  } catch (error) {
    next(error)
  }
}