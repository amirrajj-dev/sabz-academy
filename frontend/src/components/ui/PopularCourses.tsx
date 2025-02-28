'use client'
import React from 'react'
import SectionHeader from '../shared/SectionHeader';
import CourseCardSkeleton from '../skeletons/CourseCardSkeleton';
import { courses } from '@/data/data';
import CourseCard from '../shared/CourseCard';
import { useCourseStore } from '@/store/course.store';

const PopularCourses = () => {
  const {courses , fetchCourses , isLoading} = useCourseStore()
  const popularCourses = courses.slice(0,8)
    return (
        <div className="mt-20">
          <SectionHeader
            title="پرطرفدار ترین دوره ها"
            squareColor="bg-emerald-500"
            desc="دوره های محبوب و پروژه محور سبزلرن"
            haveLink={false}
            linkText=""
            linkUrl=""
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 mt-8">
            {isLoading ? (
              Array(4).fill(1).map((_ , index)=>(
                <CourseCardSkeleton key={index + 1} />
              ))
            ) : (
              popularCourses.map((course, index) => (
                <CourseCard key={course.id} course={course} />
              ))
            )}
          </div>
        </div>
      );
}

export default PopularCourses