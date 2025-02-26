'use client'
import React from 'react'
import CourseMaster from './CourseMaster'
import CourseLink from './CourseLink'
import CourseDesc from './CourseDesc'

const CourseDescription = () => {
  return (
    <div className='mt-10 flex flex-col lg:flex-row gap-8'>
        {/* Bigger Section: Course Description */}
        <div className="flex flex-1 bg-base-300 p-4 rounded-lg">
          <CourseDesc />
        </div>

        {/* Smaller Section: Master and Link */}
        <div className="flex flex-col lg:w-1/3 h-fit gap-8 bg-base-300 p-4 rounded-lg">
            <CourseMaster />
            <CourseLink />
        </div>
    </div>
  )
}

export default CourseDescription