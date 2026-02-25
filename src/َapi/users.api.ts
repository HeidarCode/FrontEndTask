import type { UsersResponse } from '../types/user.types'

const BASE_URL = 'https://dummyjson.com'

export const fetchUsers = async (
  page: number = 1,
  limit: number = 10,
  search: string = ''
): Promise<UsersResponse> => {
  const skip = (page - 1) * limit

  const url = search
    ? `${BASE_URL}/users/search?q=${search}&limit=${limit}&skip=${skip}`
    : `${BASE_URL}/users?limit=${limit}&skip=${skip}`

  const res = await fetch(url)

  if (!res.ok) throw new Error('خطا در دریافت کاربران')

  return res.json()
}
