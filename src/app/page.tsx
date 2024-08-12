import { Button } from "@/components/ui/button";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";


export default function Home() {
  return (
   <div>
     <div className=" w-full flex h-screen">
        <aside className=" w-[50%] h-full  flex">
          <h1 className="text-7xl px-32 py-24 leading-normal font-bold text-white">Your <label className="text-lime-500">Go-To</label> Platform for Effective Crowdfunding</h1>
        </aside>
        <main className=" w-[50%] h-full ">
          <div className="px-16 py-32 flex flex-col gap-10">
            <p className="text-white text-2xl w-[470px] font-semibold opacity-50">JoinFund is an innovative crowdfunding platform designed to simplify the creation and management of fundraising campaigns. With an intuitive interface and powerful tools, JoinFund enables project creators to reach a wide audience and secure the financial support needed to bring their ideas.</p>
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
