import type { NextFunction, Request, Response } from "express";
import prisma from "../../utils/prisma";

export const getAllCategories = async (req : Request , res : Response , next : NextFunction)=>{
    try {
        const categories = await prisma.category.findMany({
            include: {
                courses: {
                    select: {
                        id: true,
                        status: true,
                        price: true,
                        name: true,
                        category: {
                            select: { title: true },
                        },
                    },
                },
            }
        })
        return res.status(200).json({
            success: true,
            data: categories,
        });
    } catch (error) {
        next(error);
    }
}
export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, name } = req.body;

        if (!title || !name) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }

        const isCategoryExist = await prisma.category.findFirst({
            where: {
                title: title,
            },
        });

        if (isCategoryExist) {
            return res.status(400).json({
                message: "Category already exists",
                success: false,
            });
        }

        const newCategory = await prisma.category.create({
            data: {
                title,
                name,
            },
        });

        return res.status(201).json({
            success: true,
            data: newCategory,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteCategory = async (req : Request , res : Response , next : NextFunction)=>{}
export const updateCategory = async (req : Request , res : Response , next : NextFunction)=>{}
