import type { BaseResponse } from './base'

export interface ArticleTag {
  id: number
  name: string
  createTime: string
  categoryId: number
}

export interface CreateArticleTagDto {
  name: string
  categoryId: number
}
export type CreateArticleTagResponse = BaseResponse<ArticleTag>

export interface UpdateArticleTagDto {
  name?: string
  categoryId?: number
}

export type updateArticleTagByIdResponse = BaseResponse<ArticleTag>

export interface GetArticleTagDto {
  name?: string
  categoryId?: number
}

export type GetArticleTagListResponse = BaseResponse<ArticleTag[]>
