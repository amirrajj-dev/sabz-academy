import type { NextFunction, Request, Response } from "express";
import prisma from "../../utils/prisma";
import bcrypt from "bcryptjs";
import { uploadToCloudinary } from "../../utils/fileUpload";

const emailReg = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

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
        isBanned: true,
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
    const { username, email, phone } = req.body;
    const file = req.file

    if (!username && !email && !phone) {
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
    if (email && !emailReg.test(email)){
      return res.status(400).json({
        message :'invalid email format',
        success : false
      })
    }
    if (email.trim()) {
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
    
    if (file && file.size > 0) {
      let coverURL = await uploadToCloudinary(file);
      updateData.profile = coverURL;
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
        profile : true,
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
    if (!userId) return res.status(400).json({ message: "User ID required", success: false });

    const user = await prisma.user.findUnique({ where: { id: userId }});
    if (!user) return res.status(404).json({ message: "User not found", success: false });
    if (user.role === "ADMIN") return res.status(400).json({ message: "Admins cannot be deleted", success: false });

    await deleteUserComments(userId);

    await Promise.all([
      prisma.ticket.deleteMany({ where: { userId }}),
      prisma.reply.deleteMany({ where: { userId }}),
      prisma.article.deleteMany({ where: { creatorID: userId }})
    ]);

    await prisma.user.delete({ where: { id: userId }});

    return res.status(200).json({ message: "User deleted successfully", success: true });
  } catch (error) {
    next(error);
  }
};

const deleteUserComments = async (userId: string) => {
  const userComments = await prisma.comment.findMany({
    where: { creatorID: userId },
    select: { id: true }
  });
  const commentIds = userComments.map(c => c.id);

  await prisma.comment.updateMany({
    where: {
      OR: [
        { id: { in: commentIds } }, 
        { mainCommentID: { in: commentIds } } 
      ]
    },
    data: {
      mainCommentID: null
    }
  });

  await prisma.comment.deleteMany({
    where: { creatorID: userId }
  });
};

export const banUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userID = req.params.id;
    if (!userID) {
      return res.status(400).json({
        message: "userId is required",
        success: false,
      });
    }
    const user = await prisma.user.findUnique({
      where: { id: userID },
    });
    if (!user) {
      return res.status(404).json({
        message: "user not found",
        success: false,
      });
    }
    if (user.role === "ADMIN") {
      return res.status(400).json({
        message: "Admins cannot be banned",
        success: false,
      });
    }

    if (user.isBanned) {
      //un ban user
      await prisma.user.update({
        where: { id: userID },
        data: { isBanned: false },
      });
      return res.status(200).json({
        message: "User unbanned successfully",
        success: true,
      });
    }

    await prisma.user.update({
      where: { id: userID },
      data: { isBanned: true },
    });
    return res.status(200).json({
      message: "User banned successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
export const getUserCourses = async (
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

    const userWithCourses = await prisma.user.findUnique({
      where: { id: user.id },
      include: { courses: { orderBy: { updatedAt: "desc" } } },
    });

    if (!userWithCourses) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    return res.status(200).json({
      success: true,
      message: "Courses retrieved successfully",
      data: userWithCourses.courses || [],
    });
  } catch (error) {
    console.error("Error fetching user courses:", error);
    next(error);
  }
};

export const changeUserRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userID = req.params.id;
    const { role } = req.body;

    if (!userID || !role) {
      return res.status(400).json({
        message: "userId and role are required",
        success: false,
      });
    }

    if (role !== "USER" && role !== "ADMIN") {
      return res.status(400).json({
        message: "Invalid role. Allowed roles: USER, ADMIN",
        success: false,
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userID },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (user.role === "ADMIN" && role === "USER") {
      const adminCount = await prisma.user.count({
        where: { role: "ADMIN" },
      });

      if (adminCount <= 1) {
        return res.status(400).json({
          message: "Cannot remove the last admin",
          success: false,
        });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userID },
      data: { role },
      select: {
        id: true,
        username: true,
        role: true,
      },
    });

    return res.status(200).json({
      message: `User role updated successfully to ${role}`,
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
