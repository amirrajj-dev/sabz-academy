"use client";
import React, { useEffect, memo, useCallback, use } from 'react';
import { useCourseStore } from '@/store/course.store';
import { useCommentsStore } from '@/store/comment.store';
import BreadCrumb from '@/components/shared/breadCrumb/BreadCrumb';
import CourseHeader from '@/components/course/ui/courseHeader/CourseHeader';
import CourseDetails from '@/components/course/ui/courseDetails/CourseDetails';
import CourseDesc from '@/components/course/ui/courseDescription/CourseDesc';
import CourseSessions from '@/components/course/ui/courseSessions/CourseSessions';
import RelatedCourses from '@/components/course/ui/relatedCourses/RelatedCourses';
import CourseCommentSection from '@/components/course/ui/courseCommentSesction/CourseCommentSection';
import CourseMaster from '@/components/course/ui/courseDescription/CourseMaster';
import CourseLink from '@/components/course/ui/courseDescription/CourseLink';
import { redirect } from 'next/navigation';

const Course = ({ params }: { params: Promise<{course : string}>}) => {
  const { getSingleCourse, mainCourse, fetchRelatedCourses , resetMainCourse } = useCourseStore();
  const { getAllComments } = useCommentsStore();
  const { course } = use(params);

  useEffect(() => {
    resetMainCourse()
    const fetchData = async () => {
      const res = await getSingleCourse(course);
      console.log(res);
      if (!res.success){
        redirect('/')
      }
      await fetchRelatedCourses(course);
      await getAllComments();
    };
    fetchData();
  }, [course]);

  return (
    <div className="max-w-7xl mx-auto my-10 p-4">
      <BreadCrumb
        title={mainCourse?.name as string}
        category={mainCourse?.category.name}
        categoryLink={`/courses?sort=${mainCourse?.category.title}`}
        section="دوره ها"
        sectionLink='/courses'
      />
      <CourseHeader />
      <CourseDetails />
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <CourseDesc />
          <CourseSessions />
          <RelatedCourses />
          <CourseCommentSection courseId={mainCourse?.id as string} />
        </div>
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

export default Course;