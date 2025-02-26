import BreadCrumb from '@/components/course/BreadCrumb'
import React from 'react'
interface MainCourseProps {
    params : Promise<{course : string}>
}

const MainCourse : React.FC<MainCourseProps> = async ({params}) => {
    const {course} = (await params)

  return (
    <div className='max-w-7xl mx-auto my-20'>
      <BreadCrumb courseTitle='آموزش کاربردی ESlint' courseCategory='ارتقای  مهارت ها' courseCategoryLink='/' />
    </div>
  )
}

export default MainCourse