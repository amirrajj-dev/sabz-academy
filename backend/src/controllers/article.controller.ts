import type { NextFunction, Request, Response } from "express";
import prisma from "../../utils/prisma";
import { uploadToCloudinary } from "../../utils/fileUpload";

export const createArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
      const file = req.file;
      const { title, description, body, categoryID, shortName } = req.body;
      
    const user = req.user;
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not authenticated", success: false });
    }
    if (
      !title.trim() ||
      !description.trim() ||
      !body.trim() ||
      !categoryID.trim() ||
      !shortName
    ) {
      return res
        .status(400)
        .json({ success: false, message: "pleae fill all the fields" });
    }
    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "please upload a file" });
    }
    if (file.size === 0) {
      return res.status(400).json({ success: false, message: "file is empty" });
    }

    const isCategoryIdValid = await prisma.category.findFirst({
        where: { id: categoryID },
      });
      if (!isCategoryIdValid) {
        return res
         .status(404)
         .json({ success: false, message: "Invalid category ID" });
      }

    let coverURL = "";
    try {
      coverURL = await uploadToCloudinary(file);
    } catch (uploadError) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Failed to upload file to Cloudinary",
        });
    }
    const article = await prisma.article.create({
      data: {
        title,
        description,
        body,
        cover: coverURL,
        categoryID,
        shortName,
        creatorID: user.id,
        publish: 1,
      },
    });
    res
      .status(201)
      .json({
        success: true,
        message: "Article created successfully",
        data: article,
      });
  } catch (error) {
    next(error);
  }
};
export const getAllArticles = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
export const saveDraft = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
export const deleteArticle = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
