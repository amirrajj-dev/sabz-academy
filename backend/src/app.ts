import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.route.ts'
import usersRoutes from './routes/user.route.ts';
import courseRoutes from './routes/course.route.ts';
import menuRoutes from './routes/menu.route.ts';
import categoryRoutes from './routes/category.route.ts';
import articlesRoutes from './routes/article.route.ts';
import commentsRoutes from './routes/comment.route.ts';
import contactRoutes from './routes/contact.route.ts';
import searchRoutes from './routes/search.route.ts';
import notificationRoutes from './routes/notification.route.ts';
import infosRoutes from './routes/info.route.ts';
import offsRoutes from './routes/off.route.ts';
import ordersRoutes from './routes/order.route.ts';
import ticketsRoutes from './routes/ticket.route.ts';

dotenv.config();

const app = express();
app.use(cors({
  credentials : true,
  origin : 'http://localhost:5173'
}));
app.use(express.json());
app.use(helmet({
  contentSecurityPolicy : false
}))
app.use(morgan('dev'))
app.use(cookieParser())

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/courses", courseRoutes);
app.use("/menus", menuRoutes);
app.use("/category", categoryRoutes);
app.use("/articles", articlesRoutes);
app.use("/comments", commentsRoutes);
app.use("/contact", contactRoutes);
app.use("/search", searchRoutes);
app.use("/notifications", notificationRoutes);
app.use("/infos", infosRoutes);
app.use("/offs", offsRoutes);
app.use("/orders", ordersRoutes);
app.use("/tickets", ticketsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});