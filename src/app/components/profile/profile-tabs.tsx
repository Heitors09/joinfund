import React, { useCallback, useState } from 'react'
import { 
  Avatar,
  AvatarFallback,
  AvatarImage } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button'
import { Pen, SendHorizonal } from 'lucide-react'
import { InitialUser, UploadResult } from '@/app/types/auth-types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { tabValues } from '@/app/constants/sidebar-links'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { CldUploadWidget, CloudinaryUploadWidgetResults } from 'next-cloudinary';


type EditableStateUser = {
  username: boolean,
  about: boolean,
}


const ProfileTabs = ({user, tab}:{user: InitialUser, tab: string}) => {
  const initial = user?.username[0].toUpperCase()
  const [isEditableUser, setIsEditableUser] = useState<EditableStateUser>({
    username: false,
    about: false
  })
  const [userData, setUserData] = useState({
    username: user?.username || '',
    about: user?.about || ''
  });
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  
  const handleChangeUser= async (field: keyof EditableStateUser,newValue:string, user: InitialUser) => {

    const body = {
      user: user,
      ...(field === 'username' && { newUsername: newValue }),
      ...(field === 'about' && { newAboutMe: newValue }),
    };

    const response = await fetch('/api/update-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })

    setIsEditableUser(prevState => ({
      ...prevState,
      [field]: false
    }));
  }


  const createQueryString = useCallback(
      (name: string, value: string)=>{
          const params = new URLSearchParams(searchParams.toString())
          params.set(name, value)

          return params.toString()
      },
      [searchParams]
  )


  const handleTabChange = (tab: string) => {
    router.push(pathname + '?' + createQueryString('tab', tab), 
    {scroll: false})
  }

  

  return (
    <Tabs defaultValue='Edit' value={tab} className=' ring-zinc-400 flex ring-1 w-full rounded-[8px]'>
          <TabsList  className='w-auto items-start border-r p-2  border-zinc-400 h-full rounded-l-[8px] flex flex-col'>
           {tabValues.map(({value, icon: Icon, label})=>(
             <TabsTrigger onClick={()=>handleTabChange(value)} className='text-white px-8   py-5 flex gap-2 ' value={value} key={label}><Icon size={20} className='opacity-70'/>{label}</TabsTrigger>
           ))}
          </TabsList>
         <div className='h-full rounded-r-[8px]'>
          <TabsContent value='Edit' className='px-12 py-4'>
            <div>
              <h3 className='text-white font-bold text-sm mb-4'>Profile picuture</h3>
              <div className='flex items-center gap-8'>
              <Avatar className='size-24'>
                {user?.user_image.length === 0 &&
                <AvatarImage 
                src={user.user_image}
                className='object-cover'
                />
                }
                <AvatarFallback  className='text-white font-medium '><p className='text-5xl'>{initial}</p></AvatarFallback>
              </Avatar>
              <div className='flex gap-2'>
              <CldUploadWidget uploadPreset="avatar_file">
                 {({ open }) => {
                      return (
                          <Button className='bg-blue-500 text-white' onClick={() => open()}>
                             Upload picture
                          </Button>
                             );
                                 }}
               </CldUploadWidget>
                {user?.user_image.length === 0 ? <Button disabled className='ring-1 ring-red-500  flex gap-1 text-red-500'> Delete picture</Button> :
                <Button disabled className='ring-1 ring-red-500  flex gap-1 text-red-500'> Delete picture</Button>
                }
              </div>
              </div>
              <h3 className='text-white font-bold text-sm mt-8 mb-4'>Username</h3>
              <div className='flex items-center  text-white opacity-70'>
                {
                  isEditableUser.username ? 
                   <input onChange={(e) => setUserData({ ...userData, username: e.target.value })} className='rounded-md ring-[#3b82f6] duration-200 transition-all ring-2 h-12 w-[500px] bg-[#1b3338] px-3 outline-none text-white'/>
                  :
                  <input className='rounded-md h-12 w-[500px] bg-[#1b3338] px-3 outline-none text-white' value={userData.username} />}
                {
                isEditableUser.username ?
                <Button onClick={() => {
                  if (user) {
                    handleChangeUser('username', userData.username, user);
                  }
                }}><SendHorizonal size={16}/></Button>
                :
                <Button onClick={()=> setIsEditableUser(prevState => ({
                  ...prevState,
                  username: !prevState.username 
                }))}><Pen size={16}/></Button>}
              </div>
              <h3 className='text-white font-bold text-sm mt-8 mb-4'>Email</h3>
              <div className='flex items-center gap-3 text-white opacity-70'>
                <input className='rounded-md h-12 w-[500px] bg-[#1b3338] px-3 outline-none text-white' value={user?.email} readOnly/>
              </div>
              <h3 className='text-white font-bold text-sm mt-8 mb-4'>About me</h3>
              <div className='flex  text-white opacity-70'>
               {
                isEditableUser.about ? 
                <textarea onChange={(e) => setUserData({ ...userData, about: e.target.value })}  className='ring-[#3b82f6] duration-200 transition-all ring-2  rounded-md resize-none h-32 pt-2 w-[500px] bg-[#1b3338] px-3 outline-none text-white'/>
               
               :
               <textarea value={userData.about} className='rounded-md resize-none h-32 pt-2 w-[500px] bg-[#1b3338] px-3 outline-none text-white'/>}
                {
                isEditableUser.about ?
                <Button onClick={() => {
                  if (user) {
                    handleChangeUser('about', userData.about, user);
                  }
                }}><SendHorizonal size={16}/></Button>
                :
                <Button onClick={()=> setIsEditableUser(prevState => ({
                  ...prevState,
                  about: !prevState.about
                }))}><Pen size={16}/></Button>}
              </div>
            </div>
          </TabsContent>
         </div>
      </Tabs> 
  )
}

export default ProfileTabs
