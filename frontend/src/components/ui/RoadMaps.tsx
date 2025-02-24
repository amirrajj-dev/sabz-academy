import React from 'react'
import SectionHeader from '../shared/SectionHeader'
import { courseCategories } from '@/data/data'
import CourseCategory from './CourseCategory'

const RoadMaps = () => {
  return (
    <div className='mt-20' id='roadmaps'>
        <SectionHeader title='نقشه راه ها' desc='نقشه های راه برای شروع اصولی یادگیری' squareColor='bg-red-500' haveLink={false} linkText='' linkUrl='' />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 mt-8">
            {courseCategories.map(item=>(
                <CourseCategory key={item.id} count={item.count} from={item.from} icon={item.icon} text={item.title} to={item.to} />
            ))}
        </div>
    </div>
  )
}

export default RoadMaps