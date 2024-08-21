export type InitialUser = {
  id:string ,username: string, email: string
}
export type SessionTypes = {
  user: InitialUser | null,
  handleLogOut: () => void 
}