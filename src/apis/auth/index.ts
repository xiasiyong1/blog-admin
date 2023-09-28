import axiosInstance from '@/helpers/request'
import type {
  SignInWithEmailDto,
  SignInWithEmailResponse,
  SignUpWithEmailDto,
  SignUpWithCodeDto,
  SendInviteEmailDto,
  GetInviteCodeInfoResponse
} from '@/types/auth'
import type { SimpleSuccessResponse } from '@/types/base'

export const signInWithEmail = (params: SignInWithEmailDto) => {
  return axiosInstance.post<SignInWithEmailResponse>('/auth/admin/email/signin', params)
}

export const signUpWithEmail = (params: SignUpWithEmailDto) => {
  return axiosInstance.post<SimpleSuccessResponse>('/auth/admin/email/signup', params)
}

export const sendInviteEmail = (params: SendInviteEmailDto) => {
  return axiosInstance.post<SimpleSuccessResponse>('/email/invite', params)
}

export const getInviteCodeInfo = (code: string) => {
  return axiosInstance.get<GetInviteCodeInfoResponse>('/auth/invite', { params: { code } })
}

export const signUpWithCode = (params: SignUpWithCodeDto) => {
  return axiosInstance.post<SimpleSuccessResponse>('/auth/signup/code', params)
}
