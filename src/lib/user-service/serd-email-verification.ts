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
      html: `<p>Clique no link abaixo para verificar seu email:</p>
           <a href="${verificationUrl}">Verificar Email</a>`,
   })
}