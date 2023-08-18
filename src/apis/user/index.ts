import type { APISchema } from '@/apis/request/type'
import { createRequestClient } from '@/apis/request/'
import type { Casl } from '@/types/casl'

export interface User {
  email: string
  id: string
}

export enum GenderEnum {
  MALE = 1,
  FEMALE = 2,
  UN_KNOWN = 3
}

export interface Profile {
  gender: GenderEnum
  address?: string
  avatar?: string
  username?: string
  id: string
  user: User
}

interface TestAPISchema extends APISchema {
  findAll: {
    request: {
      name?: string
      gender?: number
    }
    response: Profile[]
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
