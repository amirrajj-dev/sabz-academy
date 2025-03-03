import type { Request , Response , NextFunction } from "express";
import prisma from "../../utils/prisma";

export const getAllSessions = async (req: Request, res: Response , next : NextFunction)=>{
    try {
        const sessions = await prisma.session.findMany({
            include : {
                course : {
                    select : {
                        name : true
                    }
                }
            }
        })
        return res.status(200).json({
            message : 'sessions fetched succesfully',
            success : true,
            data : sessions
        })
    } catch (error) {
        next(error);
    }
}