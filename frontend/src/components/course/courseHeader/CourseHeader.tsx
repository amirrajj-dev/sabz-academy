"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";
import { useCourseStore } from "@/store/course.store";
import { ICourse } from "@/interfaces/types";
import { toast } from "react-toastify";
import { useCartStore } from "@/store/cart.store";

const CourseHeader = () => {
  const { mainCourse, isLoading } = useCourseStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = (
    course: Pick<ICourse, "name" | "price" | "cover" | "shortName" | "discount">
  ) => {
    if (!course.cover) return toast.error("تصویری برای این دوره موجود نیست");
    addToCart({
      title: course.name,
      price: course.price,
      cover: course.cover,
      shortName: course.shortName,
      discount: course.discount, 
    });
  };

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return (price * (100 - discount)) / 100;
  };

  return (
    <div className="mt-10 flex justify-center px-4 sm:px-8">
      <motion.div
        className="flex flex-col-reverse bg-base-300 w-full max-w-6xl p-6 rounded-xl lg:rounded-none lg:p-0 lg:bg-transparent lg:flex-row items-center lg:items-start justify-between gap-10"
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
          <h2 className="font-dana-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight">
            {isLoading ? (
              <span className="skeleton w-40 sm:w-56 md:w-72 h-8 block"></span>
            ) : (
              `${mainCourse?.name} 🚀`
            )}
          </h2>

          <p className="mt-4 text-sm w-full sm:text-base md:text-lg line-clamp-3 font-dana-light text-base-content leading-7 sm:leading-8 max-w-2xl text-justify lg:text-right lg:w-full">
            {isLoading ? (
              <span className="skeleton w-full h-24 sm:h-32 md:h-40 block"></span>
            ) : (
              mainCourse?.description
            )}
          </p>

          <div className="flex flex-col w-full sm:w-auto sm:flex-row items-center justify-center lg:justify-between mt-6 sm:mt-8 gap-4 sm:gap-6">
            {isLoading ? (
              <span className="skeleton w-36 sm:w-44 md:w-52 h-10 sm:h-12 block"></span>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-success btn-lg w-full sm:w-auto px-6 py-3 rounded-full shadow-md transition-all"
                onClick={() =>
                  handleAddToCart({
                    name: mainCourse?.name as string,
                    price: mainCourse?.price as number,
                    cover: mainCourse?.cover as string,
                    shortName: mainCourse?.shortName as string,
                    discount: mainCourse?.discount as number,
                  })
                }
              >
                🎯 افزودن به سبد خرید
              </motion.button>
            )}

            <div className="flex flex-col items-end gap-1">
              {isLoading ? (
                <span className="skeleton w-24 sm:w-32 h-8 sm:h-10 block"></span>
              ) : (
                <>
                  {mainCourse && mainCourse.discount > 0 ? (
                    <>
                      <span className="text-sm line-through text-base-content/60">
                        {(
                          Math.ceil((mainCourse?.price as number) / 1000) * 1000
                        ).toLocaleString("fa-IR")}{" "}
                        تومان
                      </span>
                      <span className="font-semibold text-lg sm:text-2xl text-emerald-500">
                        {calculateDiscountedPrice(
                          mainCourse?.price as number,
                          mainCourse?.discount as number
                        ).toLocaleString("fa-IR")}{" "}
                        تومان
                      </span>
                    </>
                  ) : (
                    <span className="font-semibold text-lg sm:text-2xl text-base-content">
                      {mainCourse && mainCourse?.price > 0  ? (
                         (
                          Math.ceil((mainCourse?.price as number) / 1000) * 1000
                        ).toLocaleString("fa-IR") + " " + "تومان"
                      ) : (
                        <span className="text-emerald-500">رایگان!</span>
                      )}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="w-full lg:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
        >
          {!mainCourse?.cover ? (
            <div className="skeleton w-full sm:w-full md:w-3/4 lg:w-[500px] xl:w-[700px] h-[250px] sm:h-[300px] md:h-[400px] lg:h-[300px] rounded-2xl"></div>
          ) : (
            <Image
              src={mainCourse?.cover as string}
              className="rounded-2xl shadow-lg max-w-full h-auto"
              width={700}
              height={700}
              alt="main course cover"
            />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CourseHeader;