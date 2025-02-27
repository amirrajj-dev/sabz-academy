import BreadCrumb from "@/components/course/breadCrumb/BreadCrumb";
import CourseDesc from "@/components/course/courseDescription/CourseDesc";
import CourseLink from "@/components/course/courseDescription/CourseLink";
import CourseMaster from "@/components/course/courseDescription/CourseMaster";
import CourseDetails from "@/components/course/courseDetails/CourseDetails";
import CourseHeader from "@/components/course/courseHeader/CourseHeader";
import CourseSessions from "@/components/course/courseSessions/CourseSessions";
import RelatedCourses from "@/components/course/relatedCourses/RelatedCourses";
import React from "react";

interface MainCourseProps {
  params: Promise<{ course: string }>;
}

const MainCourse: React.FC<MainCourseProps> = async ({ params }) => {
  const { course } = await params;

  return (
    <div className="max-w-7xl mx-auto my-10 p-4">
      <BreadCrumb
        courseTitle="آموزش کاربردی ESlint"
        courseCategory="ارتقای  مهارت ها"
        courseCategoryLink="/"
      />
      <CourseHeader />
      <CourseDetails />
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          <CourseDesc />
          <CourseSessions />
          <RelatedCourses />
        </div>

        {/* Right Section */}
        <div className="lg:col-span-1">
          <div className="flex flex-col h-fit gap-6 bg-base-300 p-4 rounded-lg">
            <CourseMaster />
            <CourseLink />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCourse;