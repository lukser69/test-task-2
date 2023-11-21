export interface IUser {
  id?: number
  avatar: string
  first_name: string
  last_name: string
  email: string
}

export interface IOptions {
  selectedPage: number,
  perPage: number,
  totalUsers: number,
}