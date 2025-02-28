'use client'
import React from "react";
import SectionHeader from "../shared/SectionHeader";
import { courses } from "@/data/data";
import CourseCard from "../shared/CourseCard";
import CourseCardSkeleton from "../skeletons/CourseCardSkeleton";
import { useCourseStore } from "@/store/course.store";

const MostFollowedCourses = () => {
  const {courses , isLoading} = useCourseStore()
  const mostFollowCourses = courses.slice(0,8)
  return (
    <div className="mt-20">
      <SectionHeader
        title="محبوب ترین دوره ها"
        squareColor="bg-yellow-500"
        desc="پرمخاطب ترین دوره های رایگان سبزلرن"
        haveLink={true}
        linkText="مشاهده همه دوره ها"
        linkUrl="/"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 mt-8">
        {isLoading ? (
          Array(4).fill(1).map((_ , index)=>(
            <CourseCardSkeleton key={index + 1} />
          ))
        ) : (
          mostFollowCourses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))
        )}
      </div>
    </div>
  );
};

export default MostFollowedCourses;