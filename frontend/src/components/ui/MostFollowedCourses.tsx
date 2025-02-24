import React from "react";
import SectionHeader from "../shared/SectionHeader";
import { courses } from "@/data/data";
import CourseCard from "../shared/CourseCard";
import CourseCardSkeleton from "../skeletons/CourseCardSkeleton";

const MostFollowedCourses = () => {
  const isLoading = false;
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
          Array(4).fill(1).map(item=>(
            <CourseCardSkeleton />
          ))
        ) : (
          courses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))
        )}
      </div>
    </div>
  );
};

export default MostFollowedCourses;