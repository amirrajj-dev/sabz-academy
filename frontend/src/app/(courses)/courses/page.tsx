"use client";
import React, { useEffect, useState } from "react";
import SectionHeader from "@/components/shared/SectionHeader";
import { motion } from "framer-motion";
import { FaSearch, FaChevronDown, FaArrowDown, FaArrowUp, FaFire } from "react-icons/fa";
import { useCourseStore } from "@/store/course.store";
import CourseCard from "@/components/shared/CourseCard";
import { useCategoriesStore } from "@/store/category.store";
import CourseCardSkeleton from "@/components/skeletons/CourseCardSkeleton";
import { ICourse } from "@/interfaces/types";
import { MdOutlineSentimentDissatisfied } from "react-icons/md";

const sortingOptions = [
  { label: "ارزان ترین", key: "priceAsc", icon: <FaArrowDown className="text-lg" /> },
  { label: "گران ترین", key: "priceDesc", icon: <FaArrowUp className="text-lg" /> },
  { label: "پرمخاطب ها", key: "popular", icon: <FaFire className="text-lg text-red-500" /> },
];

const CoursesPage = () => {
  const [selectedSort, setSelectedSort] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [sortedCourses, setSortedCourses] = useState<ICourse[]>([]);

  // Filters
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isFree, setIsFree] = useState(false);
  const [isPreSale, setIsPreSale] = useState(false);

  const { courses, fetchCourses, isLoading } = useCourseStore();
  const { categories, fetchCategories } = useCategoriesStore();

  useEffect(() => {
    fetchCourses();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (courses.length > 0) {
      filterAndSortCourses();
    }
  }, [selectedSort, courses, isFree, isPreSale, selectedCategories]);

  const filterAndSortCourses = () => {
    let filteredCourses = [...courses];

    // Apply Filters
    if (isFree) {
      filteredCourses = filteredCourses.filter(course => course.price === 0);
    }

    if (isPreSale) {
      filteredCourses = filteredCourses.filter(course => course.status === "pre-sale");
    }

    if (selectedCategories.length > 0) {
      filteredCourses = filteredCourses.filter(course =>
        selectedCategories.includes(course.categoryID)
      );
    }
    if (selectedSort === "priceAsc") {
      filteredCourses.sort((a, b) => a.price - b.price);
    } else if (selectedSort === "priceDesc") {
      filteredCourses.sort((a, b) => b.price - a.price);
    } else if (selectedSort === "popular") {
      filteredCourses.sort((a, b) => b.studentsCount - a.studentsCount);
    }

    setSortedCourses(filteredCourses);
  };

  const handleCategoryChange = (categoryID: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryID) ? prev.filter(id => id !== categoryID) : [...prev, categoryID]
    );
  };

  return (
    <div className="max-w-7xl mx-auto my-20 flex flex-col gap-6 px-4">
      <div className="flex flex-col items-start sm:flex-row sm:items-center justify-between">
        <SectionHeader title="دوره ها" squareColor="bg-warning" desc="" haveLink={false} linkText="" linkUrl="" />
        <span className="text-2xl text-base-content text-nowrap">
          {sortedCourses.length} عنوان دوره آموزشی
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
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
              <input
                type="checkbox"
                className="checkbox checkbox-success"
                checked={isFree}
                onChange={() => setIsFree(!isFree)}
              />
              <span>دوره های رایگان</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="checkbox checkbox-warning"
                checked={isPreSale}
                onChange={() => setIsPreSale(!isPreSale)}
              />
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
                <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-info"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                  />
                  <span>{category.name}</span>
                </label>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Course List */}
        <div className="lg:w-3/4 w-full">
          {/* Sorting Options */}
          <motion.div
            className="flex flex-wrap items-center justify-between bg-base-300 p-4 rounded-xl shadow-md w-full"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-base-content">مرتب سازی بر اساس:</span>

            <div className="flex flex-wrap justify-center gap-3 w-full md:w-auto">
              {sortingOptions.map(({ label, key, icon }) => (
                <button
                  key={key}
                  className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-all duration-300 shadow-md ${
                    selectedSort === key ? "bg-primary text-primary-content scale-105" : "bg-base-100 hover:bg-primary/20"
                  }`}
                  onClick={() => setSelectedSort(key)}
                >
                  {icon}
                  {label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
  {isLoading ? (
    Array.from({ length: 6 }).map((_, index) => <CourseCardSkeleton key={index} />)
  ) : sortedCourses.length > 0 ? (
    sortedCourses.map((course) => <CourseCard key={course.id} course={course} />)
  ) : (
    <motion.div
    initial={{ opacity: 0, scale: 0.8, y: -50 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.8, y: 50 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="col-span-3 flex flex-col items-center justify-center text-center p-12 bg-base-300 rounded-3xl shadow-xl relative overflow-hidden"
  >
    <motion.div
      initial={{ rotate: -10, scale: 1 }}
      animate={{ rotate: 0, scale: 1.2 }}
      transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
      className="flex items-center justify-center mb-6"
    >
      <MdOutlineSentimentDissatisfied className="text-7xl text-white animate-bounce" />
    </motion.div>
  
    <motion.p
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="text-2xl font-dana-bold text-white"
    >
      هیچ دوره‌ای یافت نشد!
    </motion.p>
  
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="text-lg text-white mt-4 font-dana-light"
    >
      متأسفیم، اما در حال حاضر دوره‌ای برای نمایش وجود ندارد.
    </motion.p>
  </motion.div>
  
  )}
</div>

        </div>
      </div>
    </div>
  );
};

export default CoursesPage;