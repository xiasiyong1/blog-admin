import type { APISchema } from '@/apis/request/type'
import { createRequestClient } from '@/apis/request/'
import type { Casl } from '@/types/casl'
import type { GetUserList, User } from '@/types/user'

interface TestAPISchema extends APISchema {
  findAll: {
    request: GetUserList
    response: {
      userList: User[]
      total: number
    }
  }

  getUserInfo: {
    request: {
      id: string
    }
    response: {
      avatar: string
      id: number
      name: string
    }
  }
  delete: {
    request: {
      id: number
    }
    response: {
      avatar: string
      id: number
      name: string
    }
  }
  updateCasl: {
    request: {
      id: string
      casls: Casl[]
    }
    response: {}
  }
}

const userApi = createRequestClient<TestAPISchema>({
  apis: {
    findAll: 'GET /user',
    getUserInfo: 'GET /user/:id',
    delete: 'PATCH /user/:id',
    updateCasl: 'PATCH /user/casl/:id'
  }
})

export default userApi
