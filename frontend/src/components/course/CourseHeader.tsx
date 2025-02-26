"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

const CourseHeader = () => {
  return (
    <div className="mt-10 flex justify-center">
      <motion.div
        className="flex flex-col-reverse bg-base-300 w-fit p-6 rounded-xl lg:rounded-none lg:p-0 lg:bg-transparent lg:flex-row items-center lg:items-start justify-between gap-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.div
          className="flex flex-col items-start sm:items-center lg:items-stretch justify-between w-full lg:w-1/2 text-center lg:text-right"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        >
          <h2 className="font-dana-bold text-2xl sm:text-3xl md:text-4xl leading-tight">
            آموزش کاربردی ESLint 🚀
          </h2>
          <p className="mt-6 text-base sm:text-lg font-dana-light text-base-content leading-8 max-w-2xl text-justify lg:text-right lg:w-full">
            ESLint برای برنامه‌نویسان جاوااسکریپت طراحی شده تا با این ابزار، کدهایی بهینه و بدون خطا بنویسند.
            نحوه پیکربندی و استفاده از آن در پروژه‌های مختلف آموزش داده می‌شود.
          </p>

          <div className="flex flex-col w-full sm:w-auto sm:flex-row items-center justify-center lg:justify-between mt-8 gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-success btn-lg w-full sm:w-auto px-6 py-3 rounded-full shadow-md transition-all"
            >
              🎯 افزودن به سبد خرید
            </motion.button>
            <span className="font-semibold text-2xl text-base-content">
              ۲۰۰,۰۰۰ تومان
            </span>
          </div>
        </motion.div>

        <motion.div
          className="w-full lg:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
        >
          <Image
            src="https://sabzlearn.ir/wp-content/uploads/2024/11/ESLINT-1.webp"
            className="rounded-2xl shadow-lg max-w-full h-auto"
            width={700}
            height={700}
            alt="main course cover"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CourseHeader;