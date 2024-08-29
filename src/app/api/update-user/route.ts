import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient()


export  async function POST(request: NextRequest, response: NextResponse){
  //passa o novo username e o novo about 
  const body = await request.json()
  console.log(body)
  const{ newUsername, newAboutMe,  user } = body
  
  //realiza update so daquilo que for true e mudou no campo do id do user que enviei
  try {
    const updatedUser = await prisma.user.update({
      where: {id: user.id},
      data: {
        ...(newUsername && {username: newUsername}),
        ...(newAboutMe && {about: newAboutMe}),
      }
    })
    
    const tokenData = {
      id: user?.id,
      email: user?.email,
      username:  updatedUser.username,
      about:  updatedUser.about 
    }

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_VERIFICATION_KEY!, {
      expiresIn: '1d'
    })

    const response = NextResponse.json({username: updatedUser.username,  about: updatedUser.about }, {status: 200})
    response.cookies.set("token", token, {httpOnly: true})


    return response
  } catch (error) {
    console.error('Failed to update user:', error);
    return NextResponse.json({message: 'Failed to update user'}, {status: 500})
  }

}