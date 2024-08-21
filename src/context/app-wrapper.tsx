'use client'

import { InitialUser, SessionTypes } from '@/app/types/auth-types'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { ReactNode } from 'react'
import { createContext } from 'react'

type AppWrapperTypes = {
  children: ReactNode,
  user: InitialUser | null
}

export const SessionProvider = createContext<SessionTypes | null>(null)


const AppWrapper = ({children, user}:AppWrapperTypes) => {
  const client = new QueryClient() 

  const handleLogOut = async () => {
    const logout = await fetch('/api/logout',{
      method: 'POST'
    });

    if(logout.ok){
      window.location.reload();
    }
}

  return (
    <QueryClientProvider client={client}>
      <SessionProvider.Provider value={{user, handleLogOut}}>
        {children}
      </SessionProvider.Provider>
    </QueryClientProvider>
  )
}

export default AppWrapper
