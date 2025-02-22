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
export const createComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "User not authenticated", success: false });
        }

        const { body, courseID, score, mainCommentID } = req.body;

        if (!body || !courseID || score === undefined) {
            return res.status(400).json({ message: "Please provide all required fields", success: false });
        }

        const isCourseExist = await prisma.course.findUnique({
            where: { id: courseID },
        });

        if (!isCourseExist) {
            return res.status(404).json({ message: "Course not found", success: false });
        }

        if (+score < 1 || +score > 5) {
            return res.status(400).json({ message: "Score must be between 1 and 5", success: false });
        }

        if (mainCommentID) {
            const parentComment = await prisma.comment.findUnique({
                where: { id: mainCommentID },
            });

            if (!parentComment) {
                return res.status(404).json({ message: "Parent comment not found", success: false });
            }
        }

        const comment = await prisma.comment.create({
            data: {
                body,
                courseID,
                score : +score,
                creatorID: user.id,
                answer: 0, // Admin hasn't answered yet
                isAnswer: 0,
                mainCommentID: mainCommentID || null, // If it's a reply, set the parent comment ID
            },
            include: {
                creator: { select: { id: true, username: true, email: true } }
            },
        });

        return res.status(201).json({ message: "Comment created successfully", success: true, comment });
    } catch (error) {
        next(error);
    }
};

export const deleteComment = async (req : Request , res : Response , next : NextFunction)=>{}
export const answerComment = async (req : Request , res : Response , next : NextFunction)=>{}
export const acceptComment = async (req : Request , res : Response , next : NextFunction)=>{}
export const rejectComment = async (req : Request , res : Response , next : NextFunction)=>{}