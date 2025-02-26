import React from "react";
import CourseDetailCard from "./CourseDetailCard";
import { courseDetails } from "@/data/data";

const CourseDetailsRight = () => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 w-full lg:w-3/4 gap-4">
      {courseDetails.map((item, index) => (
        <CourseDetailCard key={index} {...item} />
      ))}
    </div>
  );
};

export default CourseDetailsRight;
