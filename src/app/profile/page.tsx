'use client'

import React, { useContext } from 'react'
import { SessionProvider } from '@/context/app-wrapper'
import ProfileTabs from '../components/profile/profile-tabs'
import { useRouter, useSearchParams } from 'next/navigation'





const ProfilePage = () => {
  const user = useContext(SessionProvider)
  const router = useRouter()
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') || 'Edit'
  
  if(!user?.user){
    return router.push('/')
  }
 

  return (
    <div className=' h-screen  justify-center  mx-28  flex  my-8'>
      <ProfileTabs user={user?.user} tab={tab}/>
    </div>
  )
}

export default ProfilePage
