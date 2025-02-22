import type { NextFunction, Request, Response } from "express";
import prisma from "../../utils/prisma";

export const getAllCategories = async (req : Request , res : Response , next : NextFunction)=>{
    try {
        const categories = await prisma.category.findMany()
        return res.status(200).json({
            success: true,
            data: categories,
        });
    } catch (error) {
        next(error);
    }
}
export const createCategory = async (req : Request , res : Response , next : NextFunction)=>{}
export const deleteCategory = async (req : Request , res : Response , next : NextFunction)=>{}
export const updateCategory = async (req : Request , res : Response , next : NextFunction)=>{}
