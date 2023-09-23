import type { BaseResponse } from './base'

export interface Role {
  id: number
  name: string
  createTime: string
}

export interface CreateRoleDto {
  name: string
}

export type CreateRoleResponse = BaseResponse<Role>
export interface UpdateRoleDto {
  name: string
}
export interface FindRoleDto {
  name: string
}

export type FindRoleResponse = BaseResponse<Role[]>

export type GetRoleInfoResponse = BaseResponse<Role>
