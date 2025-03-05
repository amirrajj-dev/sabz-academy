import type { NextFunction, Request, Response } from "express";
import prisma from "../../utils/prisma";
import { uploadToCloudinary } from "../../utils/fileUpload";
import { deleteCloudinaryFile } from "./course.controller";

export const createArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const file = req.file;
    const { title, description, body, categoryID, shortName, publish } =
      req.body;
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
      !shortName ||
      publish === undefined
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

    let coverURL = await uploadToCloudinary(file);
    const article = await prisma.article.create({
      data: {
        title,
        description,
        body,
        cover: coverURL,
        categoryID,
        shortName,
        creatorID: user.id,
        publish: parseInt(publish),
      },
    });
    res.status(201).json({
      success: true,
      message: "Article created successfully",
      data: article,
    });
  } catch (error) {
    next(error);
  }
};
export const getAllArticles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const articles = await prisma.article.findMany({
      include: {
        category: true,
        creator: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json({
      success: true,
      data: articles,
    });
  } catch (error) {
    next(error);
  }
};
export const saveDraft = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, body, categoryID, shortName } = req.body;
    const file = req.file;
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
      return res.status(500).json({
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
        publish: 0, // i control the articles being a draft article or not with this field :)
      },
    });
    res.status(201).json({
      success: true,
      message: "Article saved as draft successfully",
      data: article,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const articleID = req.params.id;
    if (!articleID) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide article ID" });
    }

    const user = req.user;
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not authenticated" });
    }

    const article = await prisma.article.findUnique({
      where: { id: articleID },
      include: { creator: true, category: true },
    });

    if (!article) {
      return res
        .status(404)
        .json({ success: false, message: "Article not found" });
    }

    if (article.creatorID?.toString() !== user.id.toString()) {
      return res
        .status(403)
        .json({
          success: false,
          message: "You are not authorized to delete this article",
        });
    }

    try {
      await deleteCloudinaryFile(article.cover);
    } catch (cloudinaryError) {
      console.error("Cloudinary file deletion failed:", cloudinaryError);
      return res.status(500).json({
        success: false,
        message: "Failed to delete Cloudinary file, but article was deleted",
      });
    }

    await prisma.article.delete({
      where: { id: articleID },
    });

    res
      .status(200)
      .json({ success: true, message: "Article deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const articleID = req.params.id;
    if (!articleID) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide article ID" });
    }
    const { body, publish } = req.body;
    if (!body) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide article body" });
    }
    const user = req.user;
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not authenticated" });
    }
    const article = await prisma.article.findUnique({
      where: { id: articleID },
      include: { creator: true, category: true },
    });
    if (!article) {
      return res
        .status(404)
        .json({ success: false, message: "Article not found" });
    }
    if (article.creatorID?.toString() !== user.id.toString()) {
      return res
        .status(403)
        .json({
          success: false,
          message: "You are not authorized to update this article",
        });
    }
    const updatedArticle = await prisma.article.update({
      where: { id: articleID },
      data: {
        body,
        publish: parseInt(publish),
      },
      include: { creator: true, category: true },
    });
    res
      .status(200)
      .json({
        success: true,
        message: "Article updated successfully",
        data: updatedArticle,
      });
  } catch (error) {
    next(error);
  }
};

export const getArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const articleID = req.params.id;
    if (!articleID) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide article ID" });
    }
    const article = await prisma.article.findFirst({
      where: { shortName: articleID },
      include: { creator: true, category: true },
    });
    if (!article) {
      return res
        .status(404)
        .json({ success: false, message: "Article not found" });
    }
    res.status(200).json({ success: true, data: article });
  } catch (error) {
    next(error);
  }
};

export const getSuggestedArticles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const articleID = req.params.id;
    if (!articleID) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide article ID" });
    }
    const article = await prisma.article.findFirst({
      where: {
        shortName: articleID,
      },
    });
    if (!article) {
      return res
        .status(404)
        .json({ success: false, message: "Article not found" });
    }
    const suggestedArticles = await prisma.article.findMany({
      where: {
        categoryID: article.categoryID,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });
    return res
      .status(200)
      .json({
        success: true,
        data: suggestedArticles,
        message: "suggested articles fetchedsuccesfully",
      });
  } catch (error) {
    next(error)
  }
};
