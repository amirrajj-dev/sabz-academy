"use client";
import React, { useState } from "react";
import CourseMaster from "./CourseMaster";
import CourseLink from "./CourseLink";
import { motion } from "framer-motion";
import Image from "next/image";
import { IoDocumentText } from "react-icons/io5";

const CourseDesc = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const courseDescription = `
    این دوره برای آموزش ESLint و استفاده از آن در پروژه‌های جاوااسکریپت طراحی شده است. 
    در این دوره، شما با نحوه پیکربندی ESLint، ایجاد قواعد سفارشی، و بهبود کدهای جاوااسکریپت آشنا خواهید شد.
    این ابزار به توسعه‌دهندگان کمک می‌کند تا کدهای بهینه، بدون خطا، و قابل نگهداری بنویسند.
    ESLint از محبوب‌ترین ابزارهای linting برای جاوااسکریپت است که در پروژه‌های مختلف استفاده می‌شود.
    در این دوره، علاوه بر یادگیری مفاهیم پایه ESLint، نکات پیشرفته‌تری همچون نحوه تنظیم آن برای انواع مختلف پروژه‌ها را نیز خواهید آموخت.
    اگر به دنبال بهبود کیفیت کدهای خود و جلوگیری از اشتباهات رایج در برنامه‌نویسی جاوااسکریپت هستید، این دوره برای شما مناسب است.
  `;

  return (
    <div className="flex flex-1 bg-base-300 p-4 rounded-lg">
      <div className="flex flex-1 p-6  flex-col gap-4">
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            className="text-warning text-2xl sm:text-3xl md:text-5xl"
          >
            <IoDocumentText className="text-warning" />
          </motion.div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-dana-demi text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
            توضیحات
          </h2>
        </div>
        <Image
          src="https://sabzlearn.ir/wp-content/uploads/2024/11/c8-1.webp"
          alt="Course Image"
          className="rounded-lg w-full object-cover mb-4"
          width={500}
          height={400}
        />

        <h2 className="text-2xl font-semibold text-base-content mb-4">
          آموزش کاربردی ESLint
        </h2>

        <p className="text-lg text-gray-700">
          {isExpanded
            ? courseDescription
            : courseDescription.slice(0, 250) + "..."}
        </p>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="btn btn-success w-fit mx-auto mt-4"
        >
          {isExpanded ? "مشاهده کمتر" : "مشاهده بیشتر"}
        </button>
      </div>
    </div>
  );
};

export default CourseDesc;
