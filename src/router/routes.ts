import type { RouteRecordRaw } from 'vue-router'
import User from '@/views/user/index.vue'
import UserCasl from '@/views/user/casl.vue'
import Article from '@/views/article/index.vue'
import ArticleDetail from '@/views/article/detail.vue'
import CreateArticle from '@/views/article/create.vue'
import Menu from '@/views/menu/index.vue'
import Role from '@/views/role/index.vue'
import RoleCasl from '@/views/role/casl.vue'
import SignIn from '@/views/signin/index.vue'
import SignUp from '@/views/signup/index.vue'
import Home from '@/views/home/index.vue'
import Casl from '@/views/casl/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    redirect: '/home/user',
    component: Home,
    children: [
      { path: 'user', component: User },
      { path: 'user/casl/:id', component: UserCasl },
      { path: 'article', component: Article },
      { path: 'article/create', component: CreateArticle },
      { path: 'article/:id', component: ArticleDetail },
      { path: 'menu', component: Menu },
      { path: 'role', component: Role },
      { path: 'role/casl/:id', component: RoleCasl },
      { path: 'casl/:id', component: Casl }
    ]
  },
  {
    path: '/signin',
    component: SignIn
  },
  {
    path: '/signup',
    component: SignUp
  }
]

export default routes
