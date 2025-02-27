'use client'
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { FaLayerGroup} from "react-icons/fa";
import { motion } from "framer-motion";

const relatedCourses = [
  {
    courseName: "آموزش React از مقدماتی تا پیشرفته",
    courseImage: "https://sabzlearn.ir/wp-content/uploads/2024/11/c7-1.webp",
    courseUrl: "/courses/react",
  },
  {
    courseName: "دوره جامع Node.js",
    courseImage: "https://sabzlearn.ir/wp-content/uploads/2024/11/c7-1.webp",
    courseUrl: "/courses/nodejs",
  },
  {
    courseName: "آموزش پیشرفته TypeScript",
    courseImage: "https://sabzlearn.ir/wp-content/uploads/2024/11/c7-1.webp",
    courseUrl: "/courses/typescript",
  },
  {
    courseName: "دوره تخصصی Next.js",
    courseImage: "https://sabzlearn.ir/wp-content/uploads/2024/11/c7-1.webp",
    courseUrl: "/courses/nextjs",
  },
];

const RelatedCourses = () => {
  return (
    <div className="mt-10 p-6 bg-base-300 shadow-lg rounded-2xl">
      <div className="flex items-center gap-4 mb-6">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            className="text-warning text-5xl"
          >
            <FaLayerGroup className="text-error" />
          </motion.div>
          <h2 className="text-4xl font-dana-demi text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500">
            دوره های مرتبط
          </h2>
        </div>
      <div className="flex flex-col gap-4">
        {relatedCourses.map((course, index) => (
          <div
            key={index}
            className="bg-base-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all p-4 flex justify-between items-center gap-4"
          >
            <div className=" flex items-center gap-3">
              <Image
                width={100}
                height={50}
                src={course.courseImage}
                alt={course.courseName}
                className="object-cover rounded-md"
              />
              <h3 className="text-md font-semibold text-gray-900 dark:text-white">
                {course.courseName}
              </h3>
            </div>
            <Link href={course.courseUrl} className="flex items-center text-success text-xl gap-2">
            <span className="text-sm">مشاهده</span>
                <IoArrowBackCircleSharp/>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedCourses;
