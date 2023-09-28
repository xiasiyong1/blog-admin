import type { GenderEnum } from '@/enums/gender'
import type { Role } from './role'
import type { BaseResponse } from './base'

export interface User {
  email: string
  id: string
  roles: Role[]
  avatar: string
  phone: string
  username: string
  gender: GenderEnum
}

export interface Profile {
  gender: GenderEnum
  address?: string
  avatar?: string
  username?: string
  id: string
  user: User
}

export interface GetUserList {
  currentPage: number
  pageSize: number
  username?: string
  gender?: GenderEnum
  roles?: number[]
  email?: string
}

export interface FindUsersParams {}
export type FindUsersResponse = BaseResponse<{
  userList: User[]
  count: number
}>

export type UserInfoResponse = BaseResponse<User>

export interface UpdateUserDto {
  gender: GenderEnum
  username: string
  avatar: string
}
