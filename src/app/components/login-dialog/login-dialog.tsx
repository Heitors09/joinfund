import { Button } from '@/components/ui/button'
import React from 'react'

const LoginDialog = () => {
  return (
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
  )
}

export default LoginDialog
