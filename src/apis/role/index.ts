import axiosInstance from '@/helpers/request'
import type {
  CreateRoleDto,
  UpdateRoleDto,
  FindRoleDto,
  CreateRoleResponse,
  FindRoleResponse,
  GetRoleInfoResponse
} from '@/types/role'
import type { SimpleSuccessResponse } from '@/types/base'

export const createRole = (params: CreateRoleDto) => {
  return axiosInstance.post<CreateRoleResponse>('/role', params)
}
export const findRoles = (params?: FindRoleDto) => {
  return axiosInstance.get<FindRoleResponse>('/role/list', { params })
}
export const getRoleInfoById = (id: number) => {
  return axiosInstance.get<GetRoleInfoResponse>(`/role/${id}`)
}
export const deleteRoleById = (id: number) => {
  return axiosInstance.delete<SimpleSuccessResponse>(`/role/${id}`)
}
export const updateRoleById = (id: number, updateRoleDto: UpdateRoleDto) => {
  return axiosInstance.patch<SimpleSuccessResponse>(`/role/${id}`, updateRoleDto)
}
