"use client";
import BreadCrumb from "@/components/course/breadCrumb/BreadCrumb";
import CourseDesc from "@/components/course/courseDescription/CourseDesc";
import CourseLink from "@/components/course/courseDescription/CourseLink";
import CourseMaster from "@/components/course/courseDescription/CourseMaster";
import CourseDetails from "@/components/course/courseDetails/CourseDetails";
import CourseHeader from "@/components/course/courseHeader/CourseHeader";
import CourseSessions from "@/components/course/courseSessions/CourseSessions";
import RelatedCourses from "@/components/course/relatedCourses/RelatedCourses";
import CourseCommentSection from "@/components/course/courseCommentSesction/CourseCommentSection";
import React, { useEffect, useState } from "react";
import { useCourseStore } from "@/store/course.store";
import { useCommentsStore } from "@/store/comment.store";
import { useAuthStore } from "@/store/auth.store";
import { IUser } from "@/interfaces/types";

interface MainCourseProps {
  params: Promise<{ course: string }>;
}

const MainCourse: React.FC<MainCourseProps> = ({ params }) => {
  const {getSingleCourse , mainCourse , relatedCourses} = useCourseStore()
  const {comments , getAllComments , isLoading : commentsIsLoading} = useCommentsStore()
  useEffect(() => {
    const getCourseName = async () => {
      const { course } = await params;
      await getSingleCourse(course);
    };
    getCourseName();
    getAllComments()
  }, []);
  const {user , isAuthenticated} = useAuthStore()

  console.log(comments);
        
        
        return (
          <div className="max-w-7xl mx-auto my-10 p-4">
      <BreadCrumb
        courseTitle={mainCourse?.name as string}
        courseCategory={mainCourse?.category.name as string}
        courseCategoryLink={`/course-cat/${mainCourse?.category.title}`}
        />
      <CourseHeader />
      <CourseDetails />
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          <CourseDesc />
          <CourseSessions />
         <RelatedCourses />
          <CourseCommentSection
            comments={comments}
            courseId={mainCourse?.id as string}
            isAuthenticated={isAuthenticated}
            user={user as IUser}
          />
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
};

export default MainCourse;
