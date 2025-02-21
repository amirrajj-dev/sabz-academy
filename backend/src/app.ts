import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.route'
import usersRoutes from './routes/user.route';
import courseRoutes from './routes/course.route';
import menuRoutes from './routes/menu.route';
import categoryRoutes from './routes/category.route';
import articlesRoutes from './routes/article.route';
import commentsRoutes from './routes/comment.route';
import contactRoutes from './routes/contact.route';
import searchRoutes from './routes/search.route';
import notificationRoutes from './routes/notification.route';
import infosRoutes from './routes/info.route';
import offsRoutes from './routes/off.route';
import ordersRoutes from './routes/order.route';
import ticketsRoutes from './routes/ticket.route';
import prisma from "../utils/prisma";
import { errorMiddleware } from './middlewares/errorMiddleware'

dotenv.config();

const app = express();
app.use(cors({
  credentials : true,
  origin : process.env.CLIENT_URL || "http://localhost:5173"
}));
app.use(express.json());
app.use(helmet({
  contentSecurityPolicy : false
}))
app.use(morgan('dev'))
app.use(cookieParser())

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/menus", menuRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/articles", articlesRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/infos", infosRoutes);
app.use("/api/offs", offsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/tickets", ticketsRoutes);

app.use(errorMiddleware)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🎓💚`);
});

process.on("SIGINT" , async ()=>{
  console.log("Server is shutting down...");
  await prisma.$disconnect()
  process.exit(0);
})