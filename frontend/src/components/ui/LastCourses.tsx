import React from 'react'
import SectionHeader from '../shared/SectionHeader'
import { courses } from '@/data/data'
import CourseCard from '../shared/CourseCard'

const LastCourses = () => {
  return (
    <div className='mt-20'>
        <SectionHeader title='آخرین دوره های سبزلرن' squareColor='bg-yellow-500' desc='سکوی پرتاب شما به سمت موفقیت' haveLink={true} linkText='مشاهده همه دوره ها' linkUrl='/' />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 mt-8">
      {courses.map((course , index) => (
        <CourseCard key={index} course={course} />
      ))}
    </div>
    </div>
  )
}

export default LastCourses