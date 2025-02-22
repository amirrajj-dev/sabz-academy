import type { NextFunction, Request, Response } from "express";
import prisma from "../../utils/prisma";

export const getAllUsers = async (req : Request , res : Response , next : NextFunction)=>{}
export const updateUser = async (req : Request , res : Response , next : NextFunction)=>{}
export const deleteUser = async (req : Request , res : Response , next : NextFunction)=>{}
export const banUser = async (req : Request , res : Response , next : NextFunction)=>{}
export const getUserCourses = async (req : Request , res : Response , next : NextFunction)=>{}
export const changeUserRole = async (req : Request , res : Response , next : NextFunction)=>{}