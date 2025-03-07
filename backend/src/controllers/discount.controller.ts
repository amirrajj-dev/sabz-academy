import type { Response , Request , NextFunction } from "express";
import prisma from "../../utils/prisma";
export const createDiscount = async (req : Request , res : Response , next : NextFunction)=>{
    try {
        const user = req.user
        if (!user){
            return res.status(401).json({message : "Unauthorized" , success : false })
        }
        const { discount , code , courseId , maxUse } = req.body
        if (!discount || !code || !courseId || !maxUse){
            return res.status(400).json({message : "Invalid request" , success : false })
        }
        const course = await prisma.course.findUnique({where : {id : courseId}})
        if (!course){
            return res.status(404).json({message : "Course not found" , success : false})
        }
        const discountExists = await prisma.discount.findFirst({where : {code : code}})
        if (discountExists){
            return res.status(400).json({message : "Discount code already exists" , success : false})
        }
        await prisma.discount.create({
            data : {
                code ,
                courseID : courseId ,
                discount ,
                maxUse 
            }
        })
        return res.status(201).json({message : "Discount created successfully" , success : true})
    } catch (error) {
        next(error)
    }
}

export const DeleteDiscount = async (req : Request , res : Response , next : NextFunction)=>{
    try {
        const id = req.params.id
        if (!id){
            return res.status(400).json({message : "Invalid request" , success : false })
        }
        const discount = await prisma.discount.findUnique({
            where : {id : id}
        })
        if (!discount){
            return res.status(404).json({message : "Discount not found" , success : false})
        }
        await prisma.discount.delete({
            where : {id : id}
        })
        return res.status(200).json({message : "Discount deleted successfully" , success : true})
    } catch (error) {
        next(error)
    }
}
