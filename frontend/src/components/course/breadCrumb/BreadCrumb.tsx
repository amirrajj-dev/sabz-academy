"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaHome } from "react-icons/fa";
import Link from "next/link";
import { useCourseStore } from "@/store/course.store";

interface BreadCrumbProps {
  courseTitle: string;
  courseCategory: string;
  courseCategoryLink: string;
}

const BreadCrumb = ({
  courseTitle,
  courseCategory,
  courseCategoryLink,
}: BreadCrumbProps) => {
  const { isLoading } = useCourseStore();

  return (
    <motion.div
      className="text-xs sm:text-sm md:text-base breadcrumbs w-full py-3 sm:py-4 px-4 sm:px-8 bg-base-300 rounded-xl shadow-md mx-auto md:mx-0"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ul className="flex flex-wrap gap-2 sm:gap-4 items-center" dir="rtl">

        <li className="flex items-center gap-1 sm:gap-2">
          <Link href="/" className="p-2 rounded-md hover:bg-base-300 transition">
            <FaHome className="text-lg sm:text-xl -translate-y-px" />
          </Link>
        </li>

        <li>
          <Link href="/courses" className="transition">
            دوره‌ها
          </Link>
        </li>

        <li>
          {isLoading ? (
            <span className="skeleton w-20 h-5 block"></span>
          ) : (
            <Link href={courseCategoryLink} className="transition">
              {courseCategory}
            </Link>
          )}
        </li>

        <li className="font-bold truncate">
          {isLoading ? <span className="skeleton w-32 h-5 block"></span> : courseTitle}
        </li>
      </ul>
    </motion.div>
  );
};

export default BreadCrumb;