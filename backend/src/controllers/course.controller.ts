import type {Response , Request , NextFunction} from 'express'
import prisma from '../../utils/prisma'

export const getAllCourses = async (req : Request, res : Response , next : NextFunction) =>{
    try {
        const courses = await prisma.course.findMany()
        return res.status(200).json({
            success: true,
            data: courses,
        })
    } catch (error) {
     next(error)       
    }
}
export const createCourse = async (req : Request, res : Response , next : NextFunction) =>{}
export const deleteCourse = async (req : Request, res : Response , next : NextFunction) =>{}
export const updateCourse = async (req : Request, res : Response , next : NextFunction) =>{}
export const getSingleCourse = async (req : Request, res : Response , next : NextFunction) =>{}
export const createSession = async (req : Request, res : Response , next : NextFunction) =>{}
export const getAllSessions = async (req : Request, res : Response , next : NextFunction) =>{}