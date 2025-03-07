'use client';
import CourseCard from "@/components/shared/CourseCard";
import CourseCardSkeleton from "@/components/skeletons/CourseCardSkeleton";
import MyAccountHeader from "@/components/user/myAccountHeader/MyAccountHeader";
import { useCourseStore } from "@/store/course.store";
import Link from "next/link";
import React, { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";

const UserPannel = () => {
  const { courses, fetchCourses, isLoading } = useCourseStore();
  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="p-4">
      {/* Header */}
      <MyAccountHeader />

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row items-center justify-between bg-base-300 w-full p-4 rounded-md shadow-md mb-4">
            <h2 className="text-xl font-dana-medium mb-4 sm:mb-0">اخیرا مشاهده شده</h2>
            <Link href={"/my-account/courses"}>
              <button className="btn btn-soft btn-primary">
                <h3>همه ی دوره های ثبت نام شده</h3>
                <FaArrowLeft />
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {!isLoading ? (
              courses.slice(0, 4).map((item) => (
                <CourseCard course={item} key={item.id} />
              ))
            ) : (
              Array(4)
                .fill(0)
                .map((_, index) => <CourseCardSkeleton key={index + 1} />)
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-6">
          {/* Recent Tickets */}
          <div className="bg-base-300 p-4 rounded-md shadow-md">
            <div className="flex flex-col sm:flex-row items-center justify-between w-full">
              <h2 className="text-xl font-dana-medium mb-4 sm:mb-0">تیکت های اخیر</h2>
              <Link href={"/my-account/courses"}>
                <button className="btn btn-soft btn-primary">
                  <h3>همه ی تیکت ها</h3>
                  <FaArrowLeft />
                </button>
              </Link>
            </div>
            <div className="divider divide-base-100 my-4" />
            <div className="flex w-full flex-col items-center gap-4">
              تا به الان تیکتی ارسال نکرده اید
            </div>
          </div>

          <div className="bg-base-300 p-4 rounded-md shadow-md">
            <div className="flex flex-col sm:flex-row items-center justify-between w-full">
              <h2 className="text-xl font-dana-medium mb-4 sm:mb-0">پرسش های اخیر</h2>
            </div>
            <div className="divider divide-base-100 my-4" />
            <div className="flex w-full flex-col items-center gap-4">
              تا به الان پرسشی ارسال نکرده اید
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPannel;