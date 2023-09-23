import axiosInstance from '@/helpers/request'
import type {
  CreateArticleTagDto,
  CreateArticleTagResponse,
  UpdateArticleTagDto,
  updateArticleTagByIdResponse,
  GetArticleTagDto,
  GetArticleTagListResponse
} from '@/types/article-tag'

import type { SimpleSuccessResponse } from '@/types/base'

export const createArticleTag = (params: CreateArticleTagDto) => {
  return axiosInstance.post<CreateArticleTagResponse>('/article-tag', params)
}
export const updateArticleTagById = (id: number, updateArticleTagDto: UpdateArticleTagDto) => {
  return axiosInstance.patch<updateArticleTagByIdResponse>(
    `/article-tag/${id}`,
    updateArticleTagDto
  )
}
export const deleteArticleTagById = (id: number) => {
  return axiosInstance.delete<SimpleSuccessResponse>(`/article-tag/${id}`)
}
export const getArticleTagList = (params: GetArticleTagDto) => {
  return axiosInstance.get<GetArticleTagListResponse>('/article-tag/list', { params })
}
