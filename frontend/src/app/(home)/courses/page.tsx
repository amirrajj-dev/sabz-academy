"use client";
import React, { useState } from "react";
import SectionHeader from "@/components/shared/SectionHeader";
import { motion } from "framer-motion";
import { FaSearch, FaChevronDown, FaArrowDown, FaArrowUp, FaFire } from "react-icons/fa";

const categories = ["فرانت اند", "بک اند", "پایتون", "پی اچ پی", "امنیت"];
const sortingOptions = ["ارزان ترین", "گران ترین", "پرمخاطب ها"];

const CoursesPage = () => {
  const [selectedSort, setSelectedSort] = useState("");
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="max-w-7xl mx-auto my-20 flex flex-col gap-6 px-4">
      <div className="flex flex-col items-start sm:flex-row sm:items-center justify-between">
      <SectionHeader title="دوره ها" squareColor="bg-warning" desc="" haveLink={false} />
      <span className="text-2xl text-base-content text-nowrap">4 عنوان دوره آموزشی</span>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        
        <motion.div
          className="lg:w-1/4 bg-base-300 p-4 rounded-xl shadow-lg h-fit w-full"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold mb-4">فیلترها</h3>

          <div className="relative mb-4">
            <FaSearch className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="جستجوی بین دوره‌ها"
              className="input w-full pl-10 bg-base-100 border-none rounded-lg shadow-md focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-success" />
              <span>دوره های رایگان</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-warning" />
              <span>در حال پیش فروش</span>
            </label>
          </div>

          <div className="mt-6">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center justify-between w-full text-lg font-bold border-b pb-2"
            >
              دسته بندی دوره ها
              <FaChevronDown className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
            </button>

            <motion.div
              className="mt-3 space-y-2 overflow-hidden"
              initial={{ height: 0 }}
              animate={{ height: expanded ? "auto" : 0 }}
              transition={{ duration: 0.3 }}
            >
              {categories.map((category) => (
                <label key={category} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="checkbox checkbox-info" />
                  <span>{category}</span>
                </label>
              ))}
            </motion.div>
          </div>
        </motion.div>


        <div className="lg:w-3/4 w-full">
          
          <motion.div 
            className="flex flex-wrap items-center justify-between bg-base-300 p-4 rounded-xl shadow-md w-full"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="flex items-center gap-2 text-lg font-bold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span className="text-base-content">مرتب سازی بر اساس:</span>
            </motion.div>

            <motion.div 
              className="flex flex-wrap justify-center gap-3 w-full md:w-auto"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {sortingOptions.map((option, index) => (
                <motion.button
                  key={option}
                  className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-all duration-300 shadow-md ${
                    selectedSort === option ? "bg-primary text-primary-content scale-105" : "bg-base-100 hover:bg-primary/20"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedSort(option)}
                >
                  {index === 0 && <FaArrowDown className="text-lg" />}
                  {index === 1 && <FaArrowUp className="text-lg" />}
                  {index === 2 && <FaFire className="text-lg text-red-500" />}
                  {option}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
          {/* courses list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {[1, 2, 3, 4, 5, 6].map((course) => (
              <motion.div
                key={course}
                className="p-4 bg-base-300 rounded-xl shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="text-xl font-bold mb-2">دوره {course}</h4>
                <p className="text-gray-500">توضیحات مختصر دوره</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default CoursesPage;