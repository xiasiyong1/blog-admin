import type { APISchema } from '@/apis/request/type'
import { createRequestClient } from '@/apis/request/'

interface AuthAPISchema extends APISchema {
  signUp: {
    request: {
      email: string
      password: string
      code: string
    }
    response: {}
  }

  signIn: {
    request: {
      email: string
      password: string
    }
    response: {
      access_token: string
    }
  }
}

const authApi = createRequestClient<AuthAPISchema>({
  apis: {
    signUp: 'POST /auth/signup',
    signIn: 'POST /auth/signin/admin'
  }
})

export default authApi
