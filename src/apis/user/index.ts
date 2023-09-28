import axiosInstance from '@/helpers/request'
import type {
  FindUsersParams,
  FindUsersResponse,
  UserInfoResponse,
  UpdateUserDto
} from '@/types/user'
import type { SimpleSuccessResponse } from '@/types/base'

export const findUsers = (params: FindUsersParams) => {
  return axiosInstance.get<FindUsersResponse>('/user/list', { params })
}
export const getUserInfo = () => {
  return axiosInstance.get<UserInfoResponse>('/user')
}
export const updateUserInfo = (params: UpdateUserDto) => {
  return axiosInstance.patch<UserInfoResponse>('/user', params)
}

export const getUserInfoById = (userId: string) => {
  return axiosInstance.get<UserInfoResponse>(`/user/${userId}`)
}
export const updateUserInfoById = (userId: string, updateUserDto: UpdateUserDto) => {
  return axiosInstance.patch<SimpleSuccessResponse>(`/user/${userId}`, updateUserDto)
}
export const deleteUserById = (userId: string) => {
  return axiosInstance.delete<SimpleSuccessResponse>(`/user/${userId}`)
}
