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
import notificationRoutes from './routes/notification.route';
import disocuntRoutes from './routes/discount.route';
import ordersRoutes from './routes/order.route';
import ticketsRoutes from './routes/ticket.route';
import sessionRoutes from './routes/session.route'
import prisma from "../utils/prisma";
import { errorMiddleware } from './middlewares/errorMiddleware'
import fs from 'fs';
import path from 'path';
import cron from 'node-cron'
const __dirname = path.resolve()

const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}


dotenv.config();

const app = express();
app.use(cors({
  credentials : true,
  origin : process.env.CLIENT_URL || "http://localhost:3000"
}));
app.use(express.json());
app.use(helmet({
  contentSecurityPolicy : false
}))
app.use(morgan('dev'))
app.use(cookieParser())

const tmpDir = path.join(process.cwd() , 'uploads')
//every one hour deletes the tmp folder thass why we use node-cron its a cron job
cron.schedule("0 * * * *" , ()=>{
  fs.readdir(tmpDir, (err, files) => {
      if (err) {
          throw err;
      }
      files.forEach(file => {
          fs.unlink(path.join(tmpDir, file), err => {
              if (err) {
                  throw err;
              }
          });
      });
  });
})

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/menus", menuRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/articles", articlesRoutes);
app.use("/api/comments", commentsRoutes);
app.use('/api/sessions' , sessionRoutes)
app.use("/api/notifications", notificationRoutes);
app.use("/api/discounts", disocuntRoutes);
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