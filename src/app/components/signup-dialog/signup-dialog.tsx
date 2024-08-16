import { Button } from '@/components/ui/button'
import React from 'react'
import { motion } from "framer-motion"
import { Check } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'



const SignupDialog = () => {
  const {mutate, isPending, isSuccess} = useMutation({
    mutationFn: async (user: { email: string; password: string }) => {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.json();
    }
  });
  
  
  const handleOnSubmit = (formData: FormData)=> {
    const user = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };
    
    
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
         {isSuccess ? (
          <div className='flex flex-col h-full w-[60%] items-center justify-center gap-7'>
             <motion.div initial={{opacity: 0, scale: 0.5}} animate={{rotate: 360, opacity: 1, scale: 1}} transition={{type: 'spring'}} className='bg-lime-500 w-28 h-28 flex items-center justify-center rounded-[8px] '><Check className='text-white' size={80}/></motion.div>
             <motion.div 
             initial={{ opacity: 0, scale: 0.5 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.5 }}
             className='text-white flex flex-col items-center gap-1'>
               <h2 className='font-bold text-4xl'>Register Successful!</h2>
               <p className='opacity-50 text-sm'>please check your email to verify your account</p>
             </motion.div>
          </div>)  :<main className='h-full w-[60%] flex flex-col gap-3 items-center justify-center'>
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
            <Button type='submit' disabled={isPending} className='bg-lime-500 w-[144px] h-[45px] text-white font-bold rounded-[8px]'>Sign Up</Button>
          </div>
          </form>
         </main>}
      </div>
  )
}

export default SignupDialog
