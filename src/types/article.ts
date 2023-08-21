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

export interface GetArticleParams {
  title?: string
  categoryId?: number
  tagIds?: number[] | string
  currentPage?: number
  pageSize?: number
  createTime?: Date
}
