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
export const getAllMenues = async (req : Request , res : Response , next : NextFunction)=>{
    try {
        const menues = await prisma.menu.findMany({
            include : {
                children : true
            }
        })
        res.status(200).json({
            success: true,
            data: menues,
            message : "Menues fetched succesfully"
        });
    } catch (error) {
        next(error)
    }
}
export const deleteMenues = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const menuID = req.params.id;

        if (!menuID) {
            return res.status(400).json({
                success: false,
                message: "Menu ID is required",
            });
        }
        const menu = await prisma.menu.findUnique({
            where: { id: menuID },
            include: {
                children: true
            },
        });

        if (!menu) {
            return res.status(404).json({
                success: false,
                message: "Menu not found",
            });
        }
        if (menu.children.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Cannot delete a menu with child menus. Please delete the children first.",
            });
        }

        await prisma.menu.delete({
            where: { id: menuID },
        });

        res.status(200).json({
            success: true,
            message: "Menu deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};