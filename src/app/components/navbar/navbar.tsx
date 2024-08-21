'use client'

import React, { useContext, useState } from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import SearchNavbar from './search-navbar'
import Logo from './logo'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Menu } from 'lucide-react'
import SignupDialog from '../signup-dialog/signup-dialog'
import LoginDialog from '../login-dialog/login-dialog'
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { SessionProvider } from '@/context/app-wrapper'





const Navbar = () => {
const [layout, setLayout] = useState<'signup' | 'login'>('login')
const user = useContext(SessionProvider)
  
  const contentByLayout : Record<typeof layout , JSX.Element> = {
    signup : (
      <SignupDialog/>
    ),
    login : ((
      <LoginDialog/>
    ))
  }

  return (
    <div className=' w-full max-lg:justify-between max-lg:px-12 shadow-md sticky top-0 bg-[#0E1A1F]  flex group h-16  items-center justify-around'>
      <div className='flex items-center  gap-10'>
      <Logo/>
          <div className='flex max-lg:hidden  items-center gap-5'>
            <Link href='/' className='text-white text-sm hover:underline'>Discover</Link>
            <Link href='/' className='text-white text-sm hover:underline'>Creators</Link>
            <Link href='/' className='text-white text-sm hover:underline'>Explore</Link>
          </div>
          <SearchNavbar width='400px' hidden={true}/>
      </div>
      <div className='flex items-center gap-5 '>
        <Dialog>
          {user && user.user ? 
          <div><h1 className='text-white font-bold'>{user.user.username}</h1><Button onClick={user.handleLogOut}>Logout</Button></div> 
           : <DialogTrigger className='text-white text-xl hover:brightness-90'>
            Login or Register
          </DialogTrigger>}
          <DialogContent className='bg-[#0E1A1F] rounded- w-[900px] rounded-[8px] h-[500px] border-none '>
              <div className='flex flex-col'>
                <div className='border-b flex gap-12 text-white justify-end text-xl pb-3 -mt-2'>
                   <p className={layout === 'signup' ? 'text-lime-500 hover:cursor-pointer ' : 'text-white hover:cursor-pointer'} onClick={()=> setLayout('signup')}>Signup</p>
                   <p className={layout === 'login' ? 'text-lime-500 hover:cursor-pointer' : 'text-white hover:cursor-pointer'} onClick={()=> setLayout('login')}>Login</p>
                </div> 
                {contentByLayout[layout]}
              </div>
          </DialogContent>
        </Dialog>
      <div className='lg:hidden'>
      <Drawer>
      <DrawerTrigger asChild>
        <Button size="icon" >
          <Menu className="text-white border-none"/>
        </Button>
      </DrawerTrigger>
      <DrawerContent className=" border-none bg-[#0E1A1F] text-white p-5">
         <div className="flex flex-col gap-2 py-5">
          <Link className="p-2  rounded-md" href='/'>Discover</Link>
          <Link className="p-2  rounded-md" href='/'>Creators</Link>
          <Link className="p-2  rounded-md" href='/'>Explore</Link>
         </div>
         <div className="flex items-center w-full gap-4">
           <SearchNavbar hidden={false} width='900px'/>
         </div>
      </DrawerContent>
    </Drawer>
      </div>
      </div>
    </div>
  )
}

export default Navbar
