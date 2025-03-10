import ResetPasword from '@/components/auth/ResetPassword'
import React from 'react'

interface ResetPasswordProps {
  params : Promise<{id : string}>
}
const page : React.FC<ResetPasswordProps> = async ({params}) => {
  const {id} = (await params)
  return (
    <ResetPasword token={id}/>
  )
}

export default page