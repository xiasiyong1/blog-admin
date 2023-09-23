import axiosInstance from '@/helpers/request'
import type {
  CreateArticleCategoryDto,
  CreateArticleCategoryResponse,
  GetArticleCategoryListResponse,
  UpdateArticleCategoryDto,
  GetArticleCategoryListDto,
  GetTagsByArticleCategoryIdResponse,
  UpdateArticleCategoryResponse
} from '@/types/article-category'

import type { SimpleSuccessResponse } from '@/types/base'

export const createArticleCategory = (params: CreateArticleCategoryDto) => {
  return axiosInstance.post<CreateArticleCategoryResponse>('/article-category', params)
}

export const getArticleCategoryList = (params: GetArticleCategoryListDto) => {
  return axiosInstance.get<GetArticleCategoryListResponse>('/article-category/list', {
    params
  })
}
export const deleteArticleCategoryById = (id: number) => {
  return axiosInstance.delete<SimpleSuccessResponse>(`/article-category/${id}`)
}
export const updateArticleCategoryById = (
  id: number,
  updateArticleCategoryDto: UpdateArticleCategoryDto
) => {
  return axiosInstance.patch<UpdateArticleCategoryResponse>(
    `/article-category/${id}`,
    updateArticleCategoryDto
  )
}
export const getTagsByArticleCategoryId = (id: number) => {
  return axiosInstance.get<GetTagsByArticleCategoryIdResponse>(`/article-category/${id}/tags`)
}
