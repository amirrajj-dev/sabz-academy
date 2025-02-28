import type { Response, Request, NextFunction } from "express";
import prisma from "../../utils/prisma";
import { upload, uploadToCloudinary } from "../../utils/fileUpload";
import cloudinary from "../../utils/cloudinary";


export const deleteCloudinaryFile = async (fileUrl: string | null) => {
  if (fileUrl) {
    try {
      const parts = fileUrl.split('/');
      const publicIdWithExtension = parts.pop(); // Last part of the URL
      const publicId = publicIdWithExtension?.split('.')[0]; // Remove file extension

      if (publicId) {
        await cloudinary.uploader.destroy(publicId, { invalidate: true });
      } else {
        console.error("Public ID extraction failed.");
      }
    } catch (error) {
      console.error("Failed to delete from Cloudinary:", error);
    }
  }
};


export const getAllCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courses = await prisma.course.findMany({
      include : {
        category : {select : {name : true}},
        creator : {select : {name : true}}
      }
    });
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
    const file = req.file
      const { name, description, price, isComplete, status, discount, categoryID, shortName , body } = req.body;
      if (!name.trim() ||  !description.trim() || !body.trim() || isNaN(Number(price)) || isNaN(Number(isComplete)) || !status.trim() || isNaN(Number(discount)) || !categoryID.trim() || !shortName){
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
        price : parseFloat(price),
        isComplete : parseInt(isComplete),
        status,
        body,
        discount : parseFloat(discount),
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

export const updateCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courseID = req.params.id;
    if (!courseID) {
      return res.status(400).json({ success: false, message: 'Please provide course ID' });
    }

    const { name, description, price, isComplete, status, discount, shortName } = req.body;
    if (!name.trim() || !description.trim() || isNaN(Number(price)) || isNaN(Number(isComplete)) || !status.trim() || isNaN(Number(discount)) || !shortName.trim()) {
      return res.status(400).json({ success: false, message: 'Please fill all the fields correctly' });
    }

    const user = req.user;
    const course = await prisma.course.findUnique({ where: { id: courseID } });

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    if (String(course.creatorID) !== String(user.id)) {
      return res.status(403).json({ success: false, message: 'You are not authorized to update this course' });
    }

    let coverURL = course.cover;

    if (req.file) {
      // Delete old image if exists
      if (course.cover) {
        await deleteCloudinaryFile(course.cover);
      }
      // Upload new cover
      const result = await uploadToCloudinary(req.file);
      coverURL = result;
    }
    let newPrice = null
    if (discount){
      const discountPercentage = (discount / price) * 100;
      const discountPrice = price - (price * (discount / 100));
      newPrice = discountPrice
    }

    const updatedCourse = await prisma.course.update({
      where: { id: courseID },
      data: {
        name,
        description,
        price : parseFloat(String(newPrice)),
        isComplete : parseInt(isComplete),
        status,
        discount : parseFloat(discount),
        cover: coverURL,
        shortName,
      },
    });

    return res.status(200).json({ success: true, message: 'Course updated successfully', data: updatedCourse });
  } catch (error) {
    next(error);
  }
};

export const getSingleCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courseID = req.params.id
    if (!courseID) {
      return res.status(400).json({ success: false, message: 'Please provide course ID' });
    }
    const course = await prisma.course.findUnique({ where: { id: courseID } , include : {sessions : true} });
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    return res.status(200).json({ success: true, data: course , message : 'course fetched completely' });
  } catch (error) {
    next(error);
  }
};
export const createSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courseID = req.params.id;
    const { title, time, free } = req.body;
    const file = req.file;

    if (!courseID || !title.trim() || !time.trim() || isNaN(Number(free))) {
      return res.status(400).json({ success: false, message: 'Please fill all fields correctly' });
    }

    const course = await prisma.course.findUnique({ where: { id: courseID } });
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    if (!file || file.size === 0) {
      return res.status(400).json({ success: false, message: 'Please upload a file' });
    }

    const videoUrl = await uploadToCloudinary(file);
    
    const newSession = await prisma.session.create({
      data: {
        title,
        time,
        free: parseInt(free),
        video: videoUrl,
        course: { connect: { id: courseID } },
      }
    });

    res.status(201).json({ success: true, message: 'Session created successfully', session: newSession });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


export const getAllSessions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courseID = req.params.id;
    
    if (!courseID) {
      return res.status(400).json({ success: false, message: 'Please provide course ID' });
    }
    
    const course = await prisma.course.findUnique({
      where: { id: courseID },
      include: { sessions: true }
    });
    
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Sessions retrieved successfully',
      data: course.sessions
    });
  } catch (error) {
    next(error);
  }
};