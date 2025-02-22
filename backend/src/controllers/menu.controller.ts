import type { NextFunction, Request, Response } from "express";
import prisma from "../../utils/prisma";

export const createMenu = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, href, parentID } = req.body;

        if (!title || !href) {
            return res.status(400).json({
                success: false,
                message: "Title and href are required",
            });
        }

        if (parentID) {
            const parentMenu = await prisma.menu.findUnique({ where: { id: parentID } });
            if (!parentMenu) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid parentID: Parent menu not found",
                });
            }
        }
        const newMenu = await prisma.menu.create({
            data: {
                title,
                href,
                parentID: parentID || null
            },
        });

        return res.status(201).json({
            success: true,
            message: "Menu created successfully",
            data: newMenu,
        });

    } catch (error) {
        console.error("Error creating menu:", error);
        next(error);
    }
};
export const getAllMenues = async (req : Request , res : Response , next : NextFunction)=>{}
export const deleteMenues = async (req : Request , res : Response , next : NextFunction)=>{}