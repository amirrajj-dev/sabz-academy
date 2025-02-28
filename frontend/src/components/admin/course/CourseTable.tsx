"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import { useCourseStore } from "@/store/course.store";
import DeleteModal from "@/components/modals/shared/DeleteModal";
import { toast } from "react-toastify";
import { toastOptions } from "@/helpers/toastOptions";
import EditCourseModal from "@/components/modals/course/EditCourseModal";
import { ICourse } from "@/interfaces/types";
const CourseTable = () => {
  const { courses, fetchCourses , deleteCourse , editCourse } = useCourseStore();
  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDeleteCourse = async (id : string)=>{
    if (!id){
      toast.error('شناسه دوره را وارد کنید', toastOptions)
      return
    }
    const res = await deleteCourse(id)
    if (res.success){
      toast.success('دوره با موفقیت حذف شد', toastOptions)
    }else{
      toast.error('خطا در حذف دوره', toastOptions)
    }
  }

  const handleEditCourse = async (id : string , data : Partial<ICourse>)=>{
    const res = await editCourse(id , data)
    if (res.success){
      toast.success('دوره با موفقیت ویرایش شد', toastOptions)
      fetchCourses()
    }else{
      toast.error('خطا در ویرایش دوره', toastOptions)
    }
  }

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
              <td className="p-4">{course.creator?.name}</td>
              <td className="p-4">{course.category?.name}</td>
              <td className="p-4">{course.shortName}</td>
              <td className="p-4">
                {course.price > 0 ? Math.ceil(+course.price).toLocaleString() : "رایگان"}
              </td>
              <td className="p-4">{course.status}</td>
              <td className="p-4">
                <DeleteModal deleteId={course.id} onDelete={handleDeleteCourse} message="آیا از حذف این دوره اطمینان دارید ؟"  title="حذف دوره 🚀" deleteBtnText="حذف دوره" messageDesc="این اقدام قابل بازگشت نیست !"/>
              </td>
              <td className="p-4">
               <EditCourseModal onSave={(id , data)=>handleEditCourse(id , data)} editId={course.id} courseData={course}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;