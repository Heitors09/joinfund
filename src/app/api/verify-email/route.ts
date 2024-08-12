import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function GET(req: NextApiRequest, res: NextApiResponse){
    const { token } = req.query
    console.log(token)


    if(!token || typeof token !== 'string'){
      return res.status(400).json({error: 'Invalid Token'})
    }

    try {
      const decoded = jwt.verify(token,process.env.TOKEN_SECRET_VERIFICATION_KEY) as jwt.JwtPayload
      const email = decoded.email

      await prisma.user.update({
        where : {email: email},
        data : {email_verified: true }
      })

      res.redirect('/email-verified')
    } catch (error) {
      res.status(400).json({error: 'Invalid Token or Expired'})
    }


}