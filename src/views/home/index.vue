<script setup lang="ts">
import { useRouter } from 'vue-router'
import * as userApi from '@/apis/user'
import { computed, onMounted, ref } from 'vue'
import type { MenuItem } from '@/types/menu'
import { ElMenu, ElMenuItem, ElRow, ElCol, ElAvatar } from 'element-plus'
import { getDefaultAvatar } from '@/helpers/avatar'
import { removeAccessToken } from '@/helpers/localstorge'
import type { User } from '@/types/user'

const menuList: MenuItem[] = [
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
const activeKey = computed(() => {
  const path = router.currentRoute.value.path
  let key = ''
  const dfs = (menu: MenuItem[]) => {
    menu.forEach((item) => {
      if (item.path === path) {
        key = item.key
      }
      if (item.children) {
        dfs(item.children)
      }
    })
  }
  dfs(menuList)
  return key
})
const router = useRouter()
const userInfo = ref<User | null>()
const onCommand = (command: string) => {
  if (command === 'profile') {
    router.push(`/home/user/detail/${userInfo.value?.id}`)
  } else if (command === 'logout') {
    removeAccessToken()
    router.push('/signin')
  }
}

const avatar = computed(() => {
  if (userInfo.value) {
    return userInfo.value.avatar
      ? `${import.meta.env.VITE_IMAGE_PREVIEW_PREFIX}${userInfo.value.avatar}`
      : getDefaultAvatar(userInfo.value?.gender)
  }
  return ''
})
const getUserInfo = () => {
  userApi.getUserInfo().then((res) => {
    userInfo.value = res.data.data
  })
}
onMounted(() => {
  getUserInfo()
})
</script>

<template>
  <div class="h-[48px] bg-blue-200 flex items-center p-4">
    <img src="../../assets/logo.png" class="w-[30px] h-[30px] object-fill" alt="" />
    <h1 class="ml-2">管理系统</h1>
    <div class="flex-1 flex justify-end">
      <el-dropdown placement="top-end" @command="onCommand">
        <ElAvatar :src="avatar" :size="32" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="profile">个人信息</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <el-row class="h-[100vh]">
    <el-col :span="3">
      <el-menu :default-active="activeKey" class="h-full">
        <template v-for="menuItem in menuList" :key="menuItem.key">
          <el-sub-menu index="1" v-if="menuItem.children">
            <template #title>
              <span>{{ menuItem.title }}</span>
            </template>
            <el-menu-item
              :index="subMenu.key"
              v-for="subMenu in menuItem.children"
              :key="subMenu.key"
            >
              <router-link :to="subMenu.path" v-if="subMenu.path">{{ subMenu.title }}</router-link>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item v-else :index="menuItem.key">
            <router-link :to="menuItem.path" v-if="menuItem.path">{{ menuItem.title }}</router-link>
          </el-menu-item>
        </template>
      </el-menu>
    </el-col>
    <el-col :span="21">
      <div class="p-4">
        <RouterView />
      </div>
    </el-col>
  </el-row>
</template>
