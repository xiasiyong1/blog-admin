import type { RouteRecordRaw } from 'vue-router'
import User from '@/views/user/index.vue'
import UserDetail from '@/views/user/user-detail/index.vue'
import ArticleCategory from '@/views/article/article-category.vue'
import ArticleTag from '@/views/article/articke-tag.vue'
import Role from '@/views/role/index.vue'
import { RoleEnum } from '@/enums/role'

export const DYNAMIC_ROUTES: RouteRecordRaw[] = [
  { path: 'user', component: User, meta: { roles: [] } },
  { path: 'user/detail/:id', component: UserDetail, meta: { roles: [] } },
  {
    path: 'article/category',
    component: ArticleCategory,
    meta: { roles: [RoleEnum.ADMIN_ARTICLE] }
  },
  {
    path: 'article/tag',
    component: ArticleTag,
    meta: { roles: [RoleEnum.ADMIN_ARTICLE] }
  },
  { path: 'role', component: Role, meta: { roles: [] } }
]
