"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaHome } from "react-icons/fa";
import Link from "next/link";

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
  return (
    <motion.div
      className="text-sm breadcrumbs w-full py-4 px-6 bg-base-200 rounded-xl shadow-md mx-auto md:mx-0"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ul className="flex flex-wrap gap-2" dir="rtl">
        <li className="flex items-center gap-2">
          <Link href={"/"}>
            <FaHome className="text-xl -translate-y-px" />
          </Link>
        </li>
        <li>
          <Link href="/courses" className="">
            دوره‌ها
          </Link>
        </li>
        <li>
          <a href={courseCategoryLink} className="">
            {courseCategory}
          </a>
        </li>
        <li className="font-bold">{courseTitle}</li>
      </ul>
    </motion.div>
  );
};

export default BreadCrumb;
