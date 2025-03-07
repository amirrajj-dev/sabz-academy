'use client'
import EditAccountPage from '@/components/user/routes/EditAccountPage'
import UserCoursesPage from '@/components/user/routes/UserCoursesPage'
import UserTicketsPage from '@/components/user/routes/UserTicketsPage'
import { redirect } from 'next/navigation'
import React, { use } from 'react'

interface MyAccountSubProps {
    params : Promise<{route : string}>
}
const MyAccountSub : React.FC<MyAccountSubProps> = ({params}) => {
    const {route} = use(params)
    const validRoutes = ['courses' , 'tickets' , 'edit-account']
    if(!validRoutes.includes(route)){
        redirect('/my-account')
    }
  if (route === 'courses'){
    return (
        <UserCoursesPage/>
    )
  }
  if (route === 'tickets'){
    return (
        <UserTicketsPage/>
    )
  }
  if (route === 'edit-account'){
    return (
        <EditAccountPage/>
    )
  }
}

export default MyAccountSub