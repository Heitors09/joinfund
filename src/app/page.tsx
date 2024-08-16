import { Button } from "@/components/ui/button";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";


export default function Home() {
  return (
   <div>
     <div className=" w-full max-[1269px]:flex-col xl:h-screen  max-[1269px]:items-center flex  pt-12">
        <aside className="px-12 xl:w-1/2 h-full  flex">
          <h1 className="text-7xl  xl:px-32 leading-normal font-bold text-white">Your <label className="text-lime-500">Go-To</label> Platform for Effective Crowdfunding</h1>
        </aside>
        <main className=" xl:w-1/2 h-full max-[1269px]:pt-10">
          <div className="px-12 xl:px-16 flex flex-col gap-10 xl:pt-[30px]">
            <p className="text-white text-2xl xl:w-[470px] font-semibold opacity-50">JoinFund is an innovative crowdfunding platform designed to simplify the creation and management of fundraising campaigns. With an intuitive interface and powerful tools, JoinFund enables project creators to reach a wide audience and secure the financial support needed to bring their ideas.</p>
            <div className="flex items-center gap-6">
              <Button className="bg-lime-500 font-bold text-white rounded-[8px] w-[264px] h-[52px]">Start a campaign</Button>
              <Link href='/' className="text-white flex items-center gap-1 hover:underline">How it works<MoveUpRight size={20}/></Link>  
            </div>       
          </div>
        </main>
     </div>
   </div> 
  );
}
