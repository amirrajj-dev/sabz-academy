import type { NextFunction, Request, Response } from "express";
import prisma from "../../utils/prisma";

export const getAllComments = async (req : Request , res : Response , next : NextFunction)=>{}
export const createComment = async (req : Request , res : Response , next : NextFunction)=>{}
export const deleteComment = async (req : Request , res : Response , next : NextFunction)=>{}
export const answerComment = async (req : Request , res : Response , next : NextFunction)=>{}
export const acceptComment = async (req : Request , res : Response , next : NextFunction)=>{}
export const rejectComment = async (req : Request , res : Response , next : NextFunction)=>{}