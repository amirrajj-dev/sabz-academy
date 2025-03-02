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
                        name : true,
                        role : true
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

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const commentID = req.params.id;
        if (!commentID) {
            return res.status(400).json({ message: "Please provide comment ID", success: false });
        }

        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "User not authenticated", success: false });
        }

        const comment = await prisma.comment.findUnique({
            where: { id: commentID },
            include: { replies: true } // Fetch replies (nested comments)
        });

        if (!comment) {
            return res.status(404).json({ message: "Comment not found", success: false });
        }

        if (!(user.role === 'ADMIN' || comment.creatorID === user.id)) {
            return res.status(403).json({ message: "You are not authorized to delete this comment", success: false });
        }

        // Delete all replies first to Prevent Orphaned Comments
        if (comment.replies.length > 0) {
            await prisma.comment.deleteMany({
                where: { mainCommentID: commentID }
            });
        }
        
        await prisma.comment.delete({
            where: { id: commentID }
        });

        return res.status(200).json({ message: "Comment deleted successfully", success: true });

    } catch (error) {
        next(error);
    }
};

export const answerComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const commentID = req.params.id;
        const { body, courseID } = req.body;

        if (!body || !courseID) {
            return res.status(400).json({ message: "Please provide all required fields", success: false });
        }
        if (!commentID) {
            return res.status(400).json({ message: "Please provide comment ID", success: false });
        }

        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "User not authenticated", success: false });
        }

        const isCourseExist = await prisma.course.findUnique({
            where: { id: courseID },
        });
        if (!isCourseExist) {
            return res.status(404).json({ message: "Course not found", success: false });
        }

        const originalComment = await prisma.comment.findUnique({
            where: { id: commentID },
        });

        if (!originalComment) {
            return res.status(404).json({ message: "Comment not found", success: false });
        }

        if (user.role !== 'ADMIN') {
            return res.status(403).json({ message: "You are not authorized to answer this comment", success: false });
        }

        // Create a new comment as a reply
        const replyComment = await prisma.comment.create({
            data: {
                body,
                courseID,
                creatorID: user.id,
                mainCommentID: commentID, // Linking reply to the original comment
                score: 0, // replis doesent have and need any score
                answer: 1, // Mark this as an answer
                isAnswer: 1,
            },
        });

        await prisma.comment.update({
            where: { id: commentID },
            data: { isAnswer: 1 },
        });

        return res.status(201).json({ message: "Reply added successfully", success: true, replyComment });

    } catch (error) {
        next(error);
    }
};


export const acceptComment = async (req : Request , res : Response , next : NextFunction)=>{
    try {
        const commentID = req.params.id
        if (!commentID) {
            return res.status(400).json({ message: "Please provide comment ID", success: false });
        }
        const user = req.user
        if (!user) {
            return res.status(401).json({ message: "User not authenticated", success: false });
        }
        const comment = await prisma.comment.findUnique({
            where: { id: commentID },
        })
        if (!comment) {
            return res.status(404).json({ message: "Comment not found", success: false });
        }
        // this is unecessaruy completely beacuse of the protect admin route middleware but i still wanna have it🤓☝🏼🦧
        if (user.role !== 'ADMIN') {
            return res.status(403).json({ message: "You are not authorized to accept this comment", success: false });
        }
        // Accept the comment
        await prisma.comment.update({
            where: { id: commentID },
            data: { answer: 1 },
        });
        return res.status(200).json({ message: "Comment accepted successfully", success: true });
    } catch (error) {
        next(error);
    }
}
export const rejectComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const commentID = req.params.id;
        if (!commentID) {
            return res.status(400).json({ message: "Please provide comment ID", success: false });
        }

        const user = req.user;
        if (!user || user.role !== 'ADMIN') {
            return res.status(403).json({ message: "You are not authorized to reject this comment", success: false });
        }

        const comment = await prisma.comment.findUnique({
            where: { id: commentID },
        });

        if (!comment) {
            return res.status(404).json({ message: "Comment not found", success: false });
        }

        await prisma.comment.delete({
            where: { id: commentID },
        });

        return res.status(200).json({ message: "Comment rejected successfully", success: true });
    } catch (error) {
        next(error);
    }
};
