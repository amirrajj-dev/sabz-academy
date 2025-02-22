import type { NextFunction, Request, Response } from "express";
import prisma from "../../utils/prisma";

export const getAllComments = async (req : Request , res : Response , next : NextFunction)=>{
    try {
        const user = req.user
        if (!user){
            return res.status(401).json({ message: "User not authenticated", success: false });
        }
        const comments = await prisma.comment.findMany({
            include : {
                creator : {
                    select : {
                        id : true,
                        email : true,
                        username : true,
                    }
                },
                course : {
                    select : {
                        id : true,
                        name : true,
                    }
                }
            }
        })
        return res.status(200).json({ message: "Comments fetched successfully", success: true, comments })
    } catch (error) {
        next(error)
    }
}
export const createComment = async (req : Request , res : Response , next : NextFunction)=>{}
export const deleteComment = async (req : Request , res : Response , next : NextFunction)=>{}
export const answerComment = async (req : Request , res : Response , next : NextFunction)=>{}
export const acceptComment = async (req : Request , res : Response , next : NextFunction)=>{}
export const rejectComment = async (req : Request , res : Response , next : NextFunction)=>{}