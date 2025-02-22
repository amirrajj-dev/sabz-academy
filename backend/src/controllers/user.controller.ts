import type { NextFunction, Request, Response } from "express";
import prisma from "../../utils/prisma";
import bcrypt from "bcryptjs";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
        phone: true,
      },
    });
    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password, phone, name } = req.body;

    if (!username && !email && !password && !phone && !name) {
      return res.status(400).json({
        message: "At least one field must be updated",
        success: false,
      });
    }

    const user = req.user;
    if (!user) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    let updateData: any = {};

    if (username) updateData.username = username;
    if (email) {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser && existingUser.id !== user.id) {
        return res.status(400).json({
          message: "Email is already in use",
          success: false,
        });
      }
      updateData.email = email;
    }
    if (phone) updateData.phone = phone;
    if (name) updateData.name = name;
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({
          message: "Password must be at least 6 characters long",
          success: false,
        });
      }
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: updateData,
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(200).json({
      message: "User updated successfully",
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    next(error);
  }
};
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({
        message: "userId is required",
        success: false,
      });
    }
    const user = await prisma.user.findUnique({
      where : {id : userId}
    })
    if (!user) {
      return res.status(404).json({
        message : 'user not found',
        success : false
      })
    }
    if (user.role === 'ADMIN'){
      return res.status(400).json({
        message : 'Admins cannot be deleted',
        success : false
      })
    }
    await prisma.user.delete({
      where : {
        id : user.id
      }
    })
    return res.status(200).json({
      message : "User deleted successfully",
      success : true
    })
  } catch (error) {
    next(error);
  }
};
export const banUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
export const getUserCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
export const changeUserRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
