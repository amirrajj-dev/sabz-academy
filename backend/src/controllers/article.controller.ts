import type { NextFunction, Request, Response } from "express";
import prisma from "../../utils/prisma";

export const createArticle = (req : Request , res : Response , next : NextFunction)=>{}
export const getAllArticles = (req : Request , res : Response , next : NextFunction)=>{}
export const saveDraft = (req : Request , res : Response , next : NextFunction)=>{}
export const deleteArticle = (req : Request , res : Response , next : NextFunction)=>{}