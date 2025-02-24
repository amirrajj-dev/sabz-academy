'use client'
import React from "react";
import { FaStar, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const CourseCard = ({ course }) => {
  return (
    <motion.div
      className="card w-full bg-base-200 shadow-lg rounded-2xl hover:shadow-xl transition-shadow duration-300 border border-gray-700"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Link href={'/'}>
        <Image
          src={course.cover}
          alt={course.name}
          className="rounded-t-2xl object-cover w-full h-32"
          width={500}
          height={128}
          layout="intrinsic"
        />
      </Link>
      <div className="card-body p-4"> 
        <h2 className="card-title text-xl font-semibold text-base-content">{course.name}</h2>
        <p className="text-xs text-base-content line-clamp-2 mt-2">{course.description}</p> {/* Reduced text size */}

        {course.discount > 0 && (
          <div className="badge badge-secondary text-base-content mt-2">
            {course.discount}% تخفیف
          </div>
        )}

        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center text-sm text-warning gap-1">
            <FaStar className="mr-2" />
            <span className="translate-y-0.5">{course.score}</span>
          </div>

          <div className="flex flex-col items-end space-y-1">
            <span
              className={`text-sm font-semibold ${course.discount > 0 ? "line-through text-base-content" : ""}`}
            >
              {course.price.toLocaleString()} تومان
            </span>
            {course.discount > 0 && (
              <span className="text-sm font-semibold text-pretty text-accent">
                {((course.price * (100 - course.discount)) / 100).toLocaleString()} تومان
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-1 text-xs text-base-content">
            <FaUsers className="translate-y-.5" />
            <span>{course.userCounts}</span>
          </div>
          <div>
            <span className="text-xs text-base-content">مدرس: {course.creator}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;