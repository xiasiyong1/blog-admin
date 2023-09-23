import type { Category } from './category'
import type { Tag } from './articke-tag'

export interface Article {
  id: number

  title: string

  cover: string

  summary: string

  content: string

  categoryId: number | undefined

  tags: Tag[]

  createTime: Date

  updateTime: Date
}

export interface AddArticle extends Omit<Article, 'id' | 'tags' | 'createTime' | 'updateTime'> {
  tagIds: number[]
}

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
