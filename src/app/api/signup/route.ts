import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { sendVerificationEmail } from "@/lib/user-service/serd-email-verification";

const prisma = new PrismaClient();

export async function POST(request: NextRequest){
  //get the body of the request and get the email password values
   const body = await request.json()
   const{ email , password } = body
   //create a hashedPassword using bcryptjs
   const salt = await bcryptjs.genSalt(10);
   const hashedPassword = await bcryptjs.hash(password, salt)
   //try to crate a document in the mongodb using the prisma schema
   try {
      const post = await prisma.user.create({
        data: {
          email: email,
          password: hashedPassword,
          username: email
        },
      })

      const tokenData = {
        email: email
      }
      const verificationToken = await jwt.sign(tokenData, process.env.TOKEN_SECRET_VERIFICATION_KEY!, {
        expiresIn: '3h'
      })
      
      sendVerificationEmail(email,verificationToken)

   } catch (error) {
     console.log(error)
   }
   return NextResponse.json("Register Successful", {status: 201})
}