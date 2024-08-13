'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { ReactNode } from 'react'

const AppWrapper = ({children}: {children: ReactNode}) => {
  const client = new QueryClient() 


  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  )
}

export default AppWrapper
