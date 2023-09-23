import axiosInstance from '@/helpers/request'
import type {
  CreateArticleDto,
  CreateArticleResponse,
  UpdateArticleDto,
  UpdateArticleResponse,
  FindArticleListDto,
  FindArticleListResponse,
  GetArticleInfoByIdResponse
} from '@/types/article'

import type { SimpleSuccessResponse } from '@/types/base'

export const createArticle = (params: CreateArticleDto) => {
  return axiosInstance.post<CreateArticleResponse>('/article', params)
}
export const updateArticleById = (id: number, updateArticleDto: UpdateArticleDto) => {
  return axiosInstance.patch<UpdateArticleResponse>(`/article/${id}`, updateArticleDto)
}
export const deleteArticleById = (id: number) => {
  return axiosInstance.delete<SimpleSuccessResponse>(`/article/${id}`)
}
export const findArticleList = (params: FindArticleListDto) => {
  return axiosInstance.get<FindArticleListResponse>('/article/list', { params })
}

export const getArticleInfoById = (id: number) => {
  return axiosInstance.get<GetArticleInfoByIdResponse>(`/article/${id}`)
}
