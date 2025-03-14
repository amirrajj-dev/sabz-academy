# Sabz Academy 🎓💚

Sabz Academy is a modern e-learning platform designed to provide users with access to courses, articles, and interactive learning experiences. The project is currently in **development mode** and consists of a **backend** built with **Express.js** and a **frontend** built with **Next.js**. The platform supports user authentication, course management, article publishing, and more.

---

## 🚀 Technologies Used

### Backend
- ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
- ![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)
- ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
- ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

### Frontend
- ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
- ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
- ![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=zustand&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

### Other Tools
- ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
- ![Nodemailer](https://img.shields.io/badge/Nodemailer-339933?style=for-the-badge&logo=nodemailer&logoColor=white)

---

## 📂 Project Structure

The project is divided into two main folders:

1. **Backend**: Contains the Express.js server, Prisma ORM, and MongoDB integration.
2. **Frontend**: Contains the Next.js application with Zustand for state management.

### Backend Structure
- **`utils/`**: Contains contains configuation for cloudinary and prisma and multer.
- **`src/`**: Contains the main server file (`app.ts`) and other backend logic.
  - **`controllers/`**: Handles business logic for routes.
  - **`middlewares/`**: Custom middleware for authentication and error handling.
  - **`routes/`**: Defines API endpoints.
  - **`utils/`**: Utility functions and configurations.
- **`prisma/`**: Prisma schema and migrations.

### Frontend Structure
- **`src/`**: Contains the most important part of  the frontend.
  - **`app/`**: Next Js App Router.
  - **`components/`**: project components.
  - **`data/`**: some necessary static project data.
  - **`helpers/`**: as the name suggest it includes some helper functions and  options.
- **`hooks/`**: necessary project custom hooks.
- **`interfaces/`**: necessary project ts considerations and interfaces.
- **`store/`**: necessary zustand store for project entities.

---

## 🛠️ Setup Instructions

### Prerequisites
- **Bun**: Install Bun from [here](https://bun.sh/).
- **MongoDB**: Set up a MongoDB database and update the `DATABASE_URL` in `.env`.
- **Cloudinary**: Create a Cloudinary account and add the credentials to `.env`.

### Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   bun install
   ```
2.Set up environment variables:
Create a `.env` file in the `backend` folder.
Add the following variables:
  ```bash
  DATABASE_URL="your_mongodb_connection_string"
  CLIENT_URL="http://localhost:3000"
  PORT=5000
  JWT_SECRET="your_jwt_secret"
  CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
  CLOUDINARY_API_KEY="your_cloudinary_api_key"
  CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
   ```
3.Run the backend in development mode:
```bash
bun run dev
```

## Frontend Setup
1.navigate to forntend folder and install dependencies : 
  ```bash
   cd frontend
   bun install
   ```
2.Run the frontend in development mode:

  ```bash
bun run dev
   ```

now go to http://localhost:3000 and see the prject!🎓💚

## 📝 Features

### Backend
- **User Authentication**: Secure signup, login, and logout functionality with JWT tokens.
- **Course Management**: Create, update, and delete courses with support for sessions and related content.
- **Article Publishing**: Publish and manage articles with categories and drafts.
- **Comment System**: Users can comment on courses and articles, with support for replies and moderation.
- **Discounts and Promotions**: Create and manage discount campaigns for courses.
- **Ticket System**: Users can create support tickets, and admins can reply and manage them.
- **File Uploads**: Integration with Cloudinary for handling image and file uploads.
- **Cron Jobs**: Automated cleanup of temporary files using `node-cron`.

### Frontend
- **Responsive Design**: Built with Tailwind CSS for a modern and responsive UI.
- **State Management**: Zustand for efficient and scalable state management.
- **Interactive Pages**: Dynamic course and article pages with rich content.
- **User Dashboard**: Users can view their enrolled courses, profile, and settings.
- **Admin Panel**: Admins can manage courses, articles, users, and tickets.
- **Authentication Flow**: Seamless login, signup, and password reset functionality.
- **CKEditor Integration**: Rich text editor for creating and editing articles and course content.
- **Daisy Ui Themes**: more that 6 daisyui beautiful themes.

  and that's it hope you like it my firend😉💚
