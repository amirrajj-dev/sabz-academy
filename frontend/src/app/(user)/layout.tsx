import Sidebar from '@/components/user/Sidebar/Sidebar'
import React from 'react'

const UserLayout = ({children} : {children : React.ReactNode}) => {
  return (
    <div>
        <div className="bg-base-300 fixed top-0 left-0 right-0 h-5 md:h-20 -z-10"></div>
        <Sidebar/>
        <div className="bg-base-300 fixed bottom-0 left-0  top-0 w-5 md:w-20"></div>
        {children}
    </div>
  )
}

export default UserLayout