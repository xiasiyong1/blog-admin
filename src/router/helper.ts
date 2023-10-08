import type { Role } from '@/types/role'
import { DYNAMIC_ROUTES } from './config'
import { RoleEnum } from '@/enums/role'

export const generateDynamicRoutes = (roles: Role[]) => {
  const routes = DYNAMIC_ROUTES.filter((route) => {
    const routeRoleIds = (route.meta?.roles ?? []) as number[]
    // 超级管理员有所有权限
    const isSuperAdmin = roles.some((role) => role.id === RoleEnum.SUPER_ADMIN)
    if (isSuperAdmin) return true
    return roles.some((role) => routeRoleIds.includes(role.id))
  })
  return routes
}
