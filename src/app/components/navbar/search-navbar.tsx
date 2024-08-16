import { Search } from 'lucide-react'
import React from 'react'

type SearchNavTypes = {
  width: string,
  hidden: boolean,
}

const SearchNavbar = ({ width , hidden }: SearchNavTypes) => {
  return (
    <div className={`h-10 w-[${width}]  bg-[#1B3338] ${hidden ? 'max-lg:hidden' : 'max-lg:flex'} flex rounded-[8px]  items-center px-4 gap-4 text-white`}>
      <Search size={20}/>
      <input className=" bg-transparent h-10 w-full outline-none" placeholder='Search here...'/>
    </div>
  )
}

export default SearchNavbar
