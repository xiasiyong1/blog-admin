import type { Category } from './category'
import type { Tag } from './tag'

export interface Article {
  id: number

  title: string

  cover: string

  summary: string

  content: string

  categoryId: number

  tagIds: number[]

  createTime: Date

  updateTime: Date
}

export type AddArticle = Omit<Article, 'id' | 'createTime' | 'updateTime'>

export interface ArticleDetail extends Omit<Article, 'categoryId' | 'tagIds'> {
  category: Category
  tags: Tag[]
}

export interface ArticleConditionParams {
  title?: string
  categoryId?: number
  tagIds: number[]
  currentPage?: number
  pageSize?: number
  createTime?: [string, string]
}

export interface GetArticleParams {
  title?: string
  categoryId?: number
  tagIds?: string
  currentPage?: number
  pageSize?: number
  startTime?: string
  endTime?: string
}
