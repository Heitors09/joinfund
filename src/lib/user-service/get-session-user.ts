import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken'


export const getSessionUser = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';

  if(!token){
    return null
  }


  const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET_VERIFICATION_KEY!)
  
  const user = {
    id: decodedToken.id,
    email: decodedToken.email,
    username: decodedToken.username
  }


  return user;
}


