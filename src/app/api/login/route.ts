import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest){
  try {
    const body = await request.json()
    const {email, password} = body
    
    const user = await prisma.user.findUnique({
      where: {
        email,
        email_verified: true
      }
    })

    if(!user){
      NextResponse.json({error: 'Invalid information'}, {status: 400})
    }

    const validPassword = await bcryptjs.compare(password, user?.password || '')
    if(!validPassword){
      NextResponse.json({error: 'Invalid information'}, {status: 400})
    }

    const tokenData = {
      id: user?.id,
      email: user?.email,
      username: user?.username
    }


    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_VERIFICATION_KEY!, {
      expiresIn: '1d'
    })

   const response = NextResponse.json({
    message: 'Login Successful',
    success: true 
   })

   response.cookies.set("token", token, {httpOnly: true})
   
   return response
  } catch (error) {
    console.log(error)
  }
}