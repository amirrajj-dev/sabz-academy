import type { Request, Response, NextFunction } from "express";
import prisma from "../../utils/prisma";


export const getAllTickets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tickets = await prisma.ticket.findMany({
      include: {
        user: true, 
        replies: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      data: tickets,
    });
  } catch (error) {
    next(error);
  }
};


export const createTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { department, type, title, priority, content } = req.body;
    const userId = req.user.id;

    if (!department || !type || !title || !priority || !content) {
      return res.status(400).json({
        success: false,
        message: "لطفا تمام فیلدها را پر کنید",
      });
    }

    const newTicket = await prisma.ticket.create({
      data: {
        department,
        type,
        title,
        priority,
        content,
        userId,
        status: "open",
      },
    });

    res.status(201).json({
      success: true,
      message: "تیکت با موفقیت ایجاد شد",
      data: newTicket,
    });
  } catch (error) {
    next(error);
  }
};

export const replyTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "لطفا محتوای پاسخ را وارد کنید",
      });
    }

    const ticket = await prisma.ticket.findUnique({
      where: { id },
      include: { replies: true }
    });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "تیکت مورد نظر یافت نشد",
      });
    }

    const reply = await prisma.reply.create({
      data: {
        content,
        userId,
        ticketId: id,
      },
      include: {
        user: true,
      },
    });

    if (ticket.status === "open") {
      await prisma.ticket.update({
        where: { id },
        data: { status: "in_progress" },
      });
    }

    const updatedTicket = await prisma.ticket.findUnique({
      where: { id },
      include: {
        user: true,
        replies: {
          include: {
            user: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: "پاسخ با موفقیت اضافه شد",
      data: updatedTicket
    });
  } catch (error) {
    next(error);
  }
};