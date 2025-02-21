import type { Response, Request, NextFunction } from "express";
import prisma from "../../utils/prisma";
import { upload, uploadToCloudinary } from "../../utils/fileUpload";
import cloudinary from "../../utils/cloudinary";

export const getAllCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courses = await prisma.course.findMany();
    return res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    next(error);
  }
};

export const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    const file = req.file
      const { name, description, price, isComplete, status, discount, categoryID, shortName } = req.body;
      if (!name.trim() || !description.trim() || !price.trim() || !isComplete.trim() || !status.trim() || !discount.trim() || !categoryID.trim() || !shortName){
        return res.status(400).json({
          success: false,
          message : "pleae fill all the fields",
        })
      }
    let coverURL = "";
    if (file) {
      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: "auto",
      });
      coverURL = result.secure_url;
    }

    const user = req.user;

    const newCourse = await prisma.course.create({
      data: {
        name,
        description,
        price: price,
        isComplete: isComplete,
        status,
        discount: discount,
        creator: {

          connect: {
            id: user.id
          },
        },
        cover: coverURL,
        shortName,
        category: {
          connect: {
            id: categoryID,
          },
        },
      },
    });

    return res.status(201).json({
      success: true,
      data: newCourse,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    next(error);
  }
};

export const deleteCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
export const updateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
export const getSingleCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
export const createSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
export const getAllSessions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
