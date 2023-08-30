import type { Category } from './category'

export interface Tag {
  id: number
  name: string
  createTime: string
  category: Category
}
