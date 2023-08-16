import type { RouteRecordRaw } from 'vue-router'
import User from '@/views/user/index.vue'
import Article from '@/views/article/index.vue'
import Menu from '@/views/menu/index.vue'
import Role from '@/views/role/index.vue'
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
      { path: 'article', component: Article },
      { path: 'menu', component: Menu },
      { path: 'role', component: Role },
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
