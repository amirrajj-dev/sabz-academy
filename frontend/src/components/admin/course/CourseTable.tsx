"use client";
import React, { useEffect } from "react";
import { Article } from "./ArticlesPage";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import { useCourseStore } from "@/store/course.store";
import DeleteModal from "@/components/modals/shared/DeleteModal";
const CourseTable = () => {
  const { courses, fetchCourses } = useCourseStore();
  useEffect(() => {
    fetchCourses();
  }, []);
  console.log(courses);
  return (
    <div className="shadow-lg rounded-xl overflow-x-auto">
      <table className="table bg-base-300 w-full text-center">
        <thead className="bg-base-300 text-base-content">
          <tr>
            <th className="p-4">شناسه</th>
            <th className="p-4">عنوان</th>
            <th className="p-4">مدرس</th>
            <th className="p-4">دسته بندی</th>
            <th className="p-4">لینک</th>
            <th className="p-4">قیمت</th>
            <th className="p-4">وضعیت</th>
            <th className="p-4">حذف</th>
            <th className="p-4">ویرایش</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr
              key={course.id}
              className={`border-b hover:bg-base-300 transition ${
                index % 2 === 0 ? "bg-base-200" : "bg-base-100"
              }`}
            >
              <td className="p-4 font-medium text-base-content">{index + 1}</td>
              <td className="p-4 font-semibold text-base-content">
                {course.name}
              </td>
              <td className="p-4">امیرحسین</td>
              <td className="p-4">امیرحسین</td>
              <td className="p-4">{course.shortName}</td>
              <td className="p-4">
                {course.price > 0 ? course.price : "رایگان"}
              </td>
              <td className="p-4">{course.status}</td>
              <td className="p-4">
                <DeleteModal message="آیا از حذف این دوره اطمینان دارید ؟"  title="حذف دوره 🚀" deleteBtnText="حذف دوره" messageDesc="این اقدام قابل بازگشت نیست !"/>
              </td>
              <td className="p-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary btn-sm"
                >
                  ویرایش
                </motion.button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;