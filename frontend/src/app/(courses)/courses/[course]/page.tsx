import BreadCrumb from '@/components/course/BreadCrumb'
import CourseHeader from '@/components/course/CourseHeader'
import React from 'react'
interface MainCourseProps {
    params : Promise<{course : string}>
}

const MainCourse : React.FC<MainCourseProps> = async ({params}) => {
    const {course} = (await params)

  return (
    <div className='max-w-7xl mx-auto my-20 p-4'>
      <BreadCrumb courseTitle='آموزش کاربردی ESlint' courseCategory='ارتقای  مهارت ها' courseCategoryLink='/' />
      <CourseHeader/>
    </div>
  )
}

export default MainCourse