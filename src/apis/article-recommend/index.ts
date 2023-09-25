import axiosInstance from '@/helpers/request'
import type { GetArticleRecommendListResponse } from '@/types/article-recommend'

import type { SimpleSuccessResponse } from '@/types/base'

export const addArticleRecommend = (id: number) => {
  return axiosInstance.post<SimpleSuccessResponse>(`/article-recommend/${id}`)
}
export const removeArticleRecommend = (id: number) => {
  return axiosInstance.delete<SimpleSuccessResponse>(`/article-recommend/${id}`)
}
export const getArticleRecommendList = () => {
  return axiosInstance.get<GetArticleRecommendListResponse>('/article-recommend/list')
}
