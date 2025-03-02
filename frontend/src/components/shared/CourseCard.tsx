"use client";
import React from "react";
import { FaStar, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ICourse } from "@/interfaces/types";

const CourseCard = ({ course }: { course: ICourse }) => {
  return (
    <motion.div
      className="card w-full relative bg-base-200 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 border hover:scale-105 border-gray-700"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/courses/${course.shortName}`}>
        <Image
          src={course.cover as string}
          alt={course.name}
          className="rounded-t-2xl object-cover w-full h-32"
          width={500}
          height={128}
          layout="intrinsic"
        />
      </Link>
      <div className="card-body p-4">
        <h2 className="card-title text-xl font-semibold text-base-content line-clamp-2 h-13">
          {course.name}
        </h2>
        <p className="text-xs text-base-content line-clamp-2 mt-2 overflow-hidden">
          {course.description}
        </p>

        {course.discount > 0 && (
          <div className="badge badge-sm badge-error absolute top-3 left-0 -rotate-30 text-base-content mt-2">
            {course.discount}% تخفیف
          </div>
        )}

        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center text-sm text-warning gap-1">
            <FaStar className="mr-2" />
            <span className="translate-y-0.5">5</span>
          </div>

          <div className="flex flex-col relative items-end space-y-1">
            {course.discount === 100 ? (
              <span className="text-sm font-semibold text-success">
                رایگان!
              </span>
            ) : (
              <>
                <span
                  className={`text-sm font-semibold ${
                    course.discount > 0 ? "line-through text-base-content" : ""
                  }`}
                >
                  
                  {(
                    Math.ceil((course?.price as number) / 1000) * 1000
                  ).toLocaleString("fa-IR")}{" "}
                  تومان
                </span>
                {course.discount > 0 && (
                  <span className="text-sm font-semibold absolute text-nowrap -top-4 text-success">
                    {(
                      (course.price * (100 - course.discount)) /
                      100
                    ).toLocaleString()}{" "}
                    تومان
                  </span>
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-1 text-xs text-base-content">
            <FaUsers className="translate-y-.5" />
            <span>158</span>
          </div>
          <div>
            <span className="text-xs text-base-content">
              مدرس: {course.creator?.name}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
