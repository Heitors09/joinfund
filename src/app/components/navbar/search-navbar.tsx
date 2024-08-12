import { Search } from 'lucide-react'
import React from 'react'

const SearchNavbar = () => {
  return (
    <div className='h-10 w-[400px] bg-[#1B3338] mx-auto ml-12  rounded-[8px] flex items-center px-4 gap-4 text-white'>
      <Search size={20}/>
      <input className=" bg-transparent h-10 w-full outline-none" placeholder='Search here...'/>
    </div>
  )
}

export default SearchNavbar
