import type { APISchema } from '@/apis/request/type'
import { createRequestClient } from '@/apis/request/'
import type { Role } from '../../types/role'
import type { Casl } from '@/types/casl'

interface RoleAPISchema extends APISchema {
  findRoles: {
    request: {
      name?: string
      currentPage?: number
      pageSize?: number
    }
    response: {
      roles: Role[]
      count: number
      pageSize: number
      currentPage: number
    }
  }
  addRole: {
    request: {
      name: string
    }
    response: {
      name: string
    }
  }
  updateRole: {
    request: {
      id: number
      name: string
    }
    response: {
      name: string
    }
  }
  deleteRole: {
    request: {
      id: number
    }
    response: {}
  }
  getRoleInfo: {
    request: {
      id: number
    }
    response: Role
  }
  updateCasl: {
    request: {
      id: number
      casls: Casl[]
    }
    response: {}
  }
}

const roleApi = createRequestClient<RoleAPISchema>({
  apis: {
    findRoles: 'GET /role',
    getRoleInfo: 'GET /role/:id',
    addRole: 'POST /role',
    updateRole: 'PATCH /role/:id',
    deleteRole: 'DELETE /role/:id',
    updateCasl: 'PATCH /role/casl/:id'
  }
})

export default roleApi
