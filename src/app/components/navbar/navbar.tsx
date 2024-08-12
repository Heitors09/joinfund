'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import SearchNavbar from './search-navbar'
import Logo from './logo'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"




const Navbar = () => {
  const [layout, setLayout] = useState<'signup' | 'login'>('login')
  
  const handleOnSubmit = (formData: FormData)=> {
    const user = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };
    
    
    if(user.email === "" || user.password === "" ){
      return 
    }
    
    fetch("api/signup",{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    })
  }
  const contentByLayout : Record<typeof layout , JSX.Element> = {
    signup : (
      <div className='h-full  flex'>
         <aside className='h-full w-[40%] flex items-center justify-center'>
          <h2 className='text-6xl  font-bold text-white'><label className='text-lime-500'>Join</label>fund</h2>
         </aside>
         <main className='h-full w-[60%] flex flex-col gap-3 items-center justify-center'>
          <div className='gap-3 flex flex-col'>
            <h2 className='text-3xl font-bold text-white'>Create Account.</h2>
            <p className='font-bold text-white text-base opacity-50'>Share your projects with the world today</p>
          </div>
          <form className='font-bold text-white font-base flex flex-col gap-3' action={handleOnSubmit}>
            <p>Email</p>
            <input name="email"   className='bg-[#1B3338] w-[325px] h-[44px] rounded-[8px] outline-none px-3'/>
            <p>Password</p>
            <input name="password" type='password' className='bg-[#1B3338] w-[325px] h-[44px] rounded-[8px] outline-none px-3'/>
          <div className='flex gap-[7px] mt-[21px]'>
            <p className='text-sm font-bold text-white flex flex-col'>Already have a account? <label className='text-lime-500'>Login {'>'}</label>  </p>
            <Button type='submit' className='bg-lime-500 w-[144px] h-[45px] text-white font-bold rounded-[8px]'>Sign Up</Button>
          </div>
          </form>
         </main>
      </div>
    ),
    login : ((
      <div className='h-full  flex'>
         <aside className='h-full w-[40%] flex items-center justify-center'>
          <h2 className='text-6xl  font-bold text-white'><label className='text-lime-500'>Join</label>fund</h2>
         </aside>
         <main className='h-full w-[60%] flex flex-col gap-3 items-center justify-center'>
          <div className='gap-3 pl-[27px] flex flex-col'>
            <h2 className='text-3xl font-bold text-white'>Welcome Back.</h2>
            <p className='font-bold text-white text-base opacity-50 max-w-[354px] '>Contribute to or fund a project of your interest right now!</p>
          </div>
          <form className='font-bold text-white font-base flex flex-col gap-3'>
            <p className=''>Email</p>
            <input className='bg-[#1B3338] w-[325px] h-[44px] rounded-[8px] outline-none px-3'/>
            <p>Password</p>
            <input className='bg-[#1B3338] w-[325px] h-[44px] rounded-[8px] outline-none px-3'/>
          <div className='flex gap-[7px] mt-[21px]'>
            <p className='text-sm font-bold text-white flex flex-col'>Already have a account? <label className='text-lime-500'>Sign up {'>'}</label>  </p>
            <Button type='submit' className='bg-lime-500 w-[144px] h-[45px] text-white font-bold rounded-[8px]'>Login</Button>
          </div>
          </form>
         </main>
      </div>
    ))
  }



  return (
    <div className=' w-full shadow-md px-16 fixed flex group h-16   items-center'>
      <div className='flex items-center gap-12  '>
          <Logo/>
          <div className='flex  items-center gap-5'>
            <Link href='/' className='text-white text-sm hover:underline'>Discover</Link>
            <Link href='/' className='text-white text-sm hover:underline'>Creators</Link>
            <Link href='/' className='text-white text-sm hover:underline'>Explore</Link>

          </div>
      </div>
          <SearchNavbar/>
      <div className='flex items-center gap-5 '>
        <Dialog>
          <DialogTrigger className='text-white text-xl hover:brightness-90'>
            Login or Register
          </DialogTrigger>
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
      </div>
    </div>
  )
}

export default Navbar
