export type InitialUser = {
  id:string ,username: string, email: string, user_image: string, about: string
}
export type SessionTypes = {
  user: InitialUser | null,
  handleLogOut: () => void 
}


export type UploadResult = {
  event?: string;
  info?: {
    secure_url: string;
    public_id: string;
    format: string;
    width: number;
    height: number;
    bytes: number;
  };
}