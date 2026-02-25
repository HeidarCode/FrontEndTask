export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  username: string
  age: number
  gender: string
  image: string
  address: {
    city: string
    country: string
  }
  company: {
    name: string
    department: string
  }
}

export interface UsersResponse {
  users: User[]
  total: number
  skip: number
  limit: number
}
