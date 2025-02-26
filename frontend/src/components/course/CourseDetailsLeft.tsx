"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaUsers } from "react-icons/fa";

const CourseDetailsLeft = () => {
  return (
    <motion.div
      className="flex flex-col gap-3 p-3 rounded-lg shadow-md bg-base-300 w-full lg:w-1/4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Course Rating */}
      <div className="flex items-center justify-between bg-base-100 p-2 rounded-md shadow-sm">
        <div className="flex items-center gap-1 text-sm font-semibold">
          <FaStar className="text-yellow-500 text-base" />
          <span>4.8</span>
        </div>
        <span className="text-gray-500 text-xs">(250 نظر)</span>
      </div>

      {/* Total Users */}
      <div className="flex items-center justify-between bg-base-100 p-2 rounded-md shadow-sm">
        <div className="flex items-center gap-1 text-sm font-semibold">
          <FaUsers className="text-primary text-base" />
          <span>1,200 شرکت‌کننده</span>
        </div>
      </div>

      {/* Course Progress Bar */}
      <div className="bg-base-100 p-2 rounded-md shadow-sm">
        <h4 className="text-sm font-semibold mb-1">پیشرفت دوره</h4>
        <div className="w-full bg-gray-300 h-2 rounded-full overflow-hidden">
          <motion.div
            className="bg-success h-full rounded-full"
            style={{ width: "75%" }} // Adjust dynamically
            initial={{ width: "0%" }}
            animate={{ width: "75%" }}
            transition={{ duration: 0.8 }}
          />
        </div>
        <span className="text-xs text-gray-500 mt-1 block">75% تکمیل شده</span>
      </div>
    </motion.div>
  );
};

export default CourseDetailsLeft;