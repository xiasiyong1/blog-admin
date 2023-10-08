import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { RouteRecordNormalized } from 'vue-router'
import type { MenuItem } from '@/types/menu'

const MENU_CONFIG: MenuItem[] = [
  {
    title: '成员管理',
    key: 'user',
    path: '/home/user'
  },
  {
    title: '文章管理',
    key: 'article',
    children: [
      {
        title: '文章列表',
        key: 'articleList',
        path: '/home/article/list'
      },
      {
        title: '文章分类',
        key: 'articleCategory',
        path: '/home/article/category'
      },
      {
        title: '文章标签',
        key: 'articleTag',
        path: '/home/article/tag'
      }
    ]
  },
  {
    title: '角色管理',
    key: 'role',
    path: '/home/role'
  }
]

const filterMenuList = (
  menuConfig: MenuItem[],
  routerMap: Record<string, RouteRecordNormalized>
): MenuItem[] => {
  const menuList: MenuItem[] = []
  menuConfig.forEach((menu) => {
    if (menu.path && routerMap[menu.path]) {
      menuList.push(menu)
    } else if (menu.children) {
      const children = filterMenuList(menu.children, routerMap)
      if (children.length) {
        menuList.push({
          ...menu,
          children
        })
      }
    }
  })
  return menuList
}

const useMenuList = () => {
  const menuList = ref<MenuItem[]>([])
  const router = useRouter()
  const routerMap = router.getRoutes().reduce(
    (map, route) => {
      map[route.path] = route
      return map
    },
    {} as Record<string, RouteRecordNormalized>
  )
  menuList.value = filterMenuList(MENU_CONFIG, routerMap)
  return { menuList }
}
export default useMenuList
