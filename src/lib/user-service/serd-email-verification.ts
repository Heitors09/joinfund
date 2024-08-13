import nodemailer from 'nodemailer';



export async function sendVerificationEmail(email: string, token: string){
   
   const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-email?token=${token}`

   const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
   })
     await transporter.sendMail({
      from: 'joinfundnotreply@gmail.com',
      to: email,
      subject: 'Verify your Account Joinfund',
      html: `<div style="font-family: Poppins, sans-serif; color: #333;">
      <div style="background-color: #f7f7f7; padding: 20px; border-radius: 8px;">
        <h1 style="; text-align: center;">Thank you for registering!</h1>
        <p style="font-size: 16px; padding-left: 25px">You now need to confirm your email to continue using our platform. Please click the button below to verify your email address:</p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${verificationUrl}" style="background-color: #84CC16; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 18px;">Verify Email</a>
        </div>
       
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <p style="font-size: 12px; color: #999;">© 2024 JoinFund, All rights reserved.</p>
      </div>
    </div>`,
   })
}