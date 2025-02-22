import type { NextFunction, Request, Response } from "express";
import prisma from "../../utils/prisma";

export const getAllUsers = async (req : Request , res : Response , next : NextFunction)=>{
    try {
        const users = await prisma.user.findMany({
            select: {
                id : true,
                name: true,
                email: true,
                username: true,
                role: true,
                createdAt : true,
                phone : true
            }
        })
        return res.status(200).json({
            success: true,
            data: users
        })
    } catch (error) {
        next(error)
    }
}
export const updateUser = async (req : Request , res : Response , next : NextFunction)=>{}
export const deleteUser = async (req : Request , res : Response , next : NextFunction)=>{}
export const banUser = async (req : Request , res : Response , next : NextFunction)=>{}
export const getUserCourses = async (req : Request , res : Response , next : NextFunction)=>{}
export const changeUserRole = async (req : Request , res : Response , next : NextFunction)=>{}