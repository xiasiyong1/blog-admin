<script setup lang="ts">
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import type { MenuItem } from '@/types/menu'
const menuList: MenuItem[] = [
  {
    title: '成员管理',
    key: 'user',
    path: '/home/user'
  },
  {
    title: '菜单管理',
    key: 'menu',
    path: '/home/menu'
  },
  {
    title: '文章管理',
    key: 'article',
    path: '/home/article'
  },
  {
    title: '角色管理',
    key: 'role',
    path: '/home/role'
  }
]
const activeKey = computed(() => {
  const path = router.currentRoute.value.path
  const currentMenu = menuList.find((item) => item.path === path)
  return currentMenu?.key
})
const router = useRouter()
</script>

<template>
  <el-row class="h-[100vh]">
    <el-col :span="3">
      <el-menu :default-active="activeKey" class="h-full">
        <el-menu-item :index="menuItem.key" v-for="menuItem in menuList" :key="menuItem.key">
          <span></span>
          <router-link :to="menuItem.path">{{ menuItem.title }}</router-link>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="21" class="p-4">
      <RouterView />
    </el-col>
  </el-row>
</template>
