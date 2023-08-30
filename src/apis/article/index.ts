import type { APISchema } from '@/apis/request/type'
import { createRequestClient } from '@/apis/request/'
import type { Category } from '../../types/category'
import type { Tag } from '../../types/tag'
import type { Article, ArticleDetail, GetArticleParams } from '../../types/article'

interface ArticleAPISchema extends APISchema {
  getAllTags: {
    request: {
      name?: string
      currentPage?: number
      pageSize?: number
    }
    response: {
      tags: Tag[]
      count: number
      pageSize: number
      currentPage: number
    }
  }
  addTag: {
    request: {
      name: string
    }
    response: {
      name: string
    }
  }
  updateTag: {
    request: {
      id: number
      name: string
      categoryId: number
    }
    response: {
      name: string
    }
  }
  deleteTag: {
    request: {
      id: number
    }
    response: {}
  }
  getAllCategoryList: {
    request: {
      name?: string
    }
    response: Category[]
  }
  addCategory: {
    request: {
      name: string
    }
    response: {
      name: string
    }
  }
  updateCategory: {
    request: {
      id: number
      name: string
    }
    response: {
      name: string
    }
  }
  deleteCategory: {
    request: {
      id: number
    }
    response: {}
  }
  getArticleList: {
    request: GetArticleParams
    response: {
      articleList: Article[]
      count: number
      pageSize: number
      currentPage: number
    }
  }
  getArticle: {
    request: {
      id: number
    }
    response: ArticleDetail
  }
  addArticle: {
    request: {
      title: string
      cover?: string
      summary: string
      content: string
      categoryId: number
      tagIds: string
    }
    response: Article
  }
  updateArticle: {
    request: Omit<Article, 'createTime' | 'updateTime'>
    response: Article
  }
  deleteArticle: {
    request: {
      id: number
    }
    response: Article
  }
}

const articleApi = createRequestClient<ArticleAPISchema>({
  apis: {
    getAllTags: 'GET /article/tag',
    addTag: 'POST /article/tag',
    deleteTag: 'DELETE  /article/tag/:id',
    updateTag: 'PATCH /article/tag/:id',
    getAllCategoryList: 'GET /article/category',
    addCategory: 'POST /article/category',
    deleteCategory: 'DELETE  /article/category/:id',
    updateCategory: 'PATCH /article/category/:id',
    getArticleList: 'GET /article',
    getArticle: 'GET /article/:id',
    addArticle: 'POST /article',
    deleteArticle: 'DELETE  /article/:id',
    updateArticle: 'PATCH /article/:id'
  }
})

export default articleApi
