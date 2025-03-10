import type { Response, Request, NextFunction } from "express";
import prisma from "../../utils/prisma";
export const createDiscount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }
    const { discount, code, courseId, maxUse } = req.body;
    if (!discount || !code || !courseId || !maxUse) {
      return res
        .status(400)
        .json({ message: "Invalid request", success: false });
    }
    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) {
      return res
        .status(404)
        .json({ message: "Course not found", success: false });
    }
    const discountExists = await prisma.discount.findFirst({
      where: { code: code },
    });
    if (discountExists) {
      return res
        .status(400)
        .json({ message: "Discount code already exists", success: false });
    }
    const newDiscount = await prisma.discount.create({
      data: {
        code,
        courseID: courseId,
        discount,
        maxUse,
      },
    });
    return res
      .status(201)
      .json({
        message: "Discount created successfully",
        success: true,
        data: newDiscount,
      });
  } catch (error) {
    next(error);
  }
};

export const DeleteDiscount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res
        .status(400)
        .json({ message: "Invalid request", success: false });
    }
    const discount = await prisma.discount.findUnique({
      where: { id: id },
    });
    if (!discount) {
      return res
        .status(404)
        .json({ message: "Discount not found", success: false });
    }
    await prisma.discount.delete({
      where: { id: id },
    });
    return res
      .status(200)
      .json({ message: "Discount deleted successfully", success: true });
  } catch (error) {
    next(error);
  }
};

export const getAllDiscounts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const disocunts = await prisma.discount.findMany();
    return res.status(200).json({
      message: "Discounts fetched successfully",
      success: true,
      discounts: disocunts,
    });
  } catch (error) {
    next(error);
  }
};

export const createCampaigan = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { discountAmount } = req.body;
      console.log(discountAmount);
      if (+discountAmount < 0 || +discountAmount > 100) {
        return res.status(400).json({
          success: false,
          message: "Discount amount must be between 0 and 100.",
        });
      }

    await prisma.course.updateMany({
      where : {
        price : {
          gt : 0
        },
        discount : {
          equals : 0
        }
      },
      data : {
        discount : +discountAmount
      }
    })
    

      await prisma.discount.create({
        data: {
            discount : +discountAmount , 
            code : 'campaigan',
            courseID : "67c20495a46a4844f84d61b7", //random object id
            maxUse : 0,
        }
      })
  
      return res.status(200).json({
        success: true,
        message: `Discount campaign created successfully with ${discountAmount}% discount.`,
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const cancelCampaigan = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
    const campaigan = await prisma.discount.findFirst({
      where : {
        code : "campaigan"
      }
    })

    await prisma.course.updateMany({
      where : {
        discount : {
          equals : campaigan?.discount
        }
      },
      data : {
        discount : 0
      }
    })

    await prisma.discount.deleteMany({
      where : {
        code : 'campaigan'
      }
    })

  
      return res.status(200).json({
        success: true,
        message: "Discount campaign canceled successfully.",
      });
    } catch (error) {
      next(error);
    }
  };