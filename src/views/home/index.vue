<script setup lang="ts">
import { computed } from 'vue'
import type { MenuItem } from '@/types/menu'
import { ElMenu, ElMenuItem, ElRow, ElCol, ElAvatar } from 'element-plus'
import { getDefaultAvatar } from '@/helpers/avatar'
import { removeAccessToken } from '@/helpers/local-storge'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import useMenuList from '@/hooks/use-menu-list'

const router = useRouter()

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
  dfs(menuList.value)
  return key
})

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const { menuList } = useMenuList()

const onCommand = (command: string) => {
  if (command === 'profile') {
    router.push('/home/user/profile')
  } else if (command === 'logout') {
    removeAccessToken()
    router.push('/signin')
  }
}

const avatar = computed(() => {
  if (userInfo) {
    return userInfo.value?.avatar
      ? `${import.meta.env.VITE_IMAGE_PREVIEW_PREFIX}${userInfo.value.avatar}`
      : getDefaultAvatar(userInfo.value?.gender)
  }
  return ''
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
@/helpers/local-storge
