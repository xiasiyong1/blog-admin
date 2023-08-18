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
  <div class="h-[48px] bg-blue-200 flex items-center p-4">
    <img src="../../assets/logo.png" class="w-[30px] h-[30px] object-fill" alt="" />
    <h1 class="ml-2">管理系统</h1>
  </div>
  <el-row class="h-[100vh]">
    <el-col :span="3">
      <el-menu :default-active="activeKey" class="h-full">
        <el-menu-item :index="menuItem.key" v-for="menuItem in menuList" :key="menuItem.key">
          <router-link :to="menuItem.path">{{ menuItem.title }}</router-link>
        </el-menu-item>
        <div></div>
      </el-menu>
    </el-col>
    <el-col :span="21">
      <div class="p-4">
        <RouterView />
      </div>
    </el-col>
  </el-row>
</template>
