import type { BaseResponse } from './base'

export interface ArticleRecommend {
  id: number
  articleId: number
  userId: number
  createTime: Date
  updateTime: Date
  sort: number
}

export type GetArticleRecommendListResponse = BaseResponse<ArticleRecommend[]>
