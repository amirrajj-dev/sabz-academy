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
      const result = await uploadToCloudinary(file)
      coverURL = result;
    }

    const user = req.user;

    const newCourse = await prisma.course.create({
      data: {
        name,
        description,
        price,
        isComplete,
        status,
        discount,
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
      message : 'course created succesfully',
      data: newCourse,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    next(error);
  }
};

export const deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courseID = req.params.id;
    if (!courseID) {
      return res.status(400).json({ success: false, message: 'Please provide course ID' });
    }

    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    const course = await prisma.course.findUnique({
      where: { id: courseID },
      include: { sessions: true, comments: true },
    });

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    if (course.creatorID?.toString() !== user.id.toString()) {
      return res.status(403).json({ success: false, message: 'You are not authorized to delete this course' });
    }

    const deleteCloudinaryFile = async (fileUrl: string | null) => {
      if (fileUrl) {
        try {
          const publicId = fileUrl.split('/').pop()?.split('.')[0];
    
          if (publicId) {
            const result = await cloudinary.uploader.destroy(publicId, { invalidate: true });
          } else {
            console.error("Public ID extraction failed.");
          }
        } catch (error) {
          console.error("Failed to delete from Cloudinary:", error);
        }
      }
    };
    
    await deleteCloudinaryFile(course.cover)

    const usersWithCourse = await prisma.user.findMany({
      where: {
        courses: { some: { id: courseID } },
      },
      select: { id: true },
    });

    await Promise.all(
      usersWithCourse.map(user =>
        prisma.user.update({
          where: { id: user.id },
          data: { courses: { disconnect: { id: courseID } } },
        })
      )
    );

    try {
      await prisma.$transaction([
        prisma.comment.deleteMany({ where: { courseID } }),
        prisma.session.deleteMany({ where: { courseId: courseID } }),
        prisma.course.delete({ where: { id: courseID } }),
      ]);
    } catch (error) {
      console.error("Database error during course deletion:", error);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }

    return res.status(200).json({ success: true, message: 'Course deleted successfully' });

  } catch (error) {
    console.error('Error deleting course:', error);
    next(error);
  }
};

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
