import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";




export async function POST(req: NextApiRequest){
   const cookieStore = cookies()
   const response = NextResponse.json('Logged out', {status: 201})
   response.cookies.delete('token')
   

   return response
}