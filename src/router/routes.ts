import type { RouteRecordRaw } from 'vue-router'

import ArticleList from '@/views/article/article-list.vue'
import EditArticle from '@/views/article/edit-article.vue'
import SignIn from '@/views/signin/index.vue'
import SignUp from '@/views/signup/index.vue'
import Home from '@/views/home/index.vue'
import InviteUser from '@/views/invite-user/index.vue'
import UserProfile from '@/views/profile/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home/article/list'
  },
  {
    path: '/home',
    redirect: '/home/article/list',
    name: 'home',
    component: Home,
    children: [
      { path: 'article/list', component: ArticleList },
      { path: 'article/:id', component: EditArticle },
      { path: 'article/create', component: EditArticle },
      { path: 'user/profile', component: UserProfile }
    ]
  },
  {
    path: '/signin',
    component: SignIn,
    meta: { doNotNeedsAuth: true }
  },
  {
    path: '/signup',
    component: SignUp,
    meta: { doNotNeedsAuth: true }
  },
  {
    path: '/invite',
    component: InviteUser,
    meta: { doNotNeedsAuth: true }
  }
]

export default routes
