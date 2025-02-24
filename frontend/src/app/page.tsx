import Landing from '@/components/ui/Landing'
import LastCourses from '@/components/ui/LastCourses'
import RoadMaps from '@/components/ui/RoadMaps'
import React from 'react'

const page = () => {
  return (
   <div className='container mx-auto max-w-7xl mt-20'>
    <Landing/>
    <LastCourses/>
    <RoadMaps/>
   </div>

  )
}

export default page