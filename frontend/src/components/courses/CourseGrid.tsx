import React from "react";
import { motion } from "framer-motion";
import CourseCardSkeleton from "@/components/skeletons/CourseCardSkeleton";
import CourseCard from "@/components/shared/CourseCard";
import { ICourse } from "@/interfaces/types";
import NoCoursesMessage from "./NoCoursesMessage";

interface CourseGridProps {
  isLoading: boolean;
  sortedCourses: ICourse[];
}

const CourseGrid: React.FC<CourseGridProps> = ({ isLoading, sortedCourses }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {isLoading ? (
        Array.from({ length: 6 }).map((_, index) => <CourseCardSkeleton key={index} />)
      ) : sortedCourses.length > 0 ? (
        sortedCourses.map((course) => <CourseCard key={course.id} course={course} />)
      ) : (
        <NoCoursesMessage />
      )}
    </div>
  );
};

export default CourseGrid;