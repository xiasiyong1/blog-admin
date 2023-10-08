import { createRouter, createWebHashHistory, type RouteRecordNormalized } from 'vue-router'
import routes from './routes'
import { getAccessToken } from '@/helpers/localstorge'
import { useUserStore } from '@/stores/user'
import { generateDynamicRoutes } from './helper'

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes // short for `routes: routes`
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  if (to.meta.doNotNeedsAuth) {
    return next()
  }
  const accessToken = getAccessToken()
  // 没有登录跳转登录页面
  if (!accessToken) {
    return next({
      path: '/signin',
      query: {
        redirect: to.fullPath
      }
    })
  }
  // 已经登录，但是没有用户信息，获取用户信息
  if (accessToken && !userStore.userInfo) {
    await userStore.getUserInfo()
  }
  // 已经登录，但是没有初始化菜单，初始化菜单
  if (!userStore.isMenuInit) {
    const dynamicRoutes = generateDynamicRoutes(userStore.roles)
    dynamicRoutes.forEach((route) => {
      router.addRoute('home', route)
    })
    userStore.changeMenuInitStatus(true)
    next({ ...to, replace: true })
  } else {
    next()
  }
})

export default router
