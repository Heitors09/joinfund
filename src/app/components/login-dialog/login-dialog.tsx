
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const LoginDialog = () => {
   const{mutate, isPending, isSuccess} = useMutation({
     mutationFn: async (user: {email: string, password: string})=>{
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      window.location.reload();
      return response.json();
    }
   })
   
  

   



  const handleOnLogin = (formData: FormData) => {
     const user = {
       email: formData.get('email') as string,
       password: formData.get('password') as string
     }

     if(user.email === "" || user.password === "" ){
      return 
    }

    mutate({email: user.email, password: user.password})
  }

  
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
          <form action={handleOnLogin} className='font-bold text-white font-base flex flex-col gap-3'>
            <p className=''>Email</p>
            <input name='email' className='bg-[#1B3338] w-[325px] h-[44px] rounded-[8px] outline-none px-3'/>
            <p>Password</p>
            <input name='password' type='password' className='bg-[#1B3338] w-[325px] h-[44px] rounded-[8px] outline-none px-3'/>
          <div className='flex gap-[7px] mt-[21px]'>
            <p className='text-sm font-bold text-white flex flex-col'>Already have a account? <label className='text-lime-500'>Sign up {'>'}</label>  </p>
            <Button type='submit'  className='bg-lime-500 w-[144px] h-[45px] text-white font-bold rounded-[8px]'>Login</Button>
          </div>
          </form>
         </main>
      </div>
  )
}

export default LoginDialog
