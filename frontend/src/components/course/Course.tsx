"use client";
import BreadCrumb from "@/components/shared/breadCrumb/BreadCrumb";
import CourseDesc from "@/components/course/ui/courseDescription/CourseDesc";
import CourseLink from "@/components/course/ui/courseDescription/CourseLink";
import CourseMaster from "@/components/course/ui/courseDescription/CourseMaster";
import CourseDetails from "@/components/course/ui/courseDetails/CourseDetails";
import CourseHeader from "@/components/course/ui/courseHeader/CourseHeader";
import CourseSessions from "@/components/course/ui/courseSessions/CourseSessions";
import RelatedCourses from "@/components/course/ui/relatedCourses/RelatedCourses";
import CourseCommentSection from "@/components/course/ui/courseCommentSesction/CourseCommentSection";
import React, { useEffect } from "react";
import { useCourseStore } from "@/store/course.store";
import { useCommentsStore } from "@/store/comment.store";

const Course = ({params} : {params: Promise<{ course: string }>}) => {
    const { getSingleCourse, mainCourse, relatedCourses } = useCourseStore();
  const {
    getAllComments
  } = useCommentsStore();
  useEffect(() => {
    const getCourseName = async () => {
      const { course } = await params;
      await getSingleCourse(course);
    };
    getCourseName();
    getAllComments();
  }, []);

  return (
    <div className="max-w-7xl mx-auto my-10 p-4">
      <BreadCrumb
        title={mainCourse?.name as string}
        category={mainCourse?.category.name as string}
        categoryLink={`/course-cat/${mainCourse?.category.title}`}
        section="دوره ها"
      />
      <CourseHeader />
      <CourseDetails />
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          <CourseDesc />
          <CourseSessions />
          <RelatedCourses />
          <CourseCommentSection courseId={mainCourse?.id as string} />
        </div>

        {/* Right Section */}
        <div className="lg:col-span-1">
          <div className="flex flex-col h-fit shadow-lg gap-6 bg-base-300 p-4 rounded-lg">
            <CourseMaster />
            <CourseLink />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Course