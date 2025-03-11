import React from "react";
import CourseDetailsLeft from "./CourseDetailsLeft";
import CourseDetailsRight from "./CourseDetailsRight";

const CourseDetails = () => {
  return (
    <div className="mt-10 flex flex-col lg:flex-row items-start gap-8">
      {/* Course Details Grid */}
      <CourseDetailsRight />

      {/* Course Rating & Progress Section */}
      <CourseDetailsLeft />
    </div>
  );
};

export default CourseDetails;
