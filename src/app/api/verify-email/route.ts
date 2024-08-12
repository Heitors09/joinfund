
import jwt from 'jsonwebtoken';
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();


export async function GET(req: NextRequest, res: NextResponse){
   const token = req.nextUrl.searchParams.get('token')

   if(!token || typeof token !== 'string'){
     return NextResponse.json('Invalid Token', {status: 400})
   }
   

   try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_VERIFICATION_KEY || '') as jwt.JwtPayload
    
    if(decoded.length === 0){
      return NextResponse.json('Server Configuration Error', {status: 500})
    }
    
    
    const email = decoded.email
    
    


    await prisma.user.update({
      where : {email: email},
      data : {email_verified: true }
    })
    return NextResponse.redirect('http://localhost:3000/email-verified')
   } catch (error) {
     return  NextResponse.json('Invalid Token', {status: 400})
   }
     

  }