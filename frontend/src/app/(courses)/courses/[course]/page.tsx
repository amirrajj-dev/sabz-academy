import BreadCrumb from '@/components/course/breadCrumb/BreadCrumb'
import CourseDescription from '@/components/course/courseDescription/CourseDescription'
import CourseDetails from '@/components/course/courseDetails/CourseDetails'
import CourseHeader from '@/components/course/courseHeader/CourseHeader'
import CourseSessions from '@/components/course/courseSessions/CourseSessions'
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
      <CourseDetails/>
      <CourseDescription/>
      <CourseSessions/>
    </div>
  )
}

export default MainCourse