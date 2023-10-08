import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types/user'
import * as userApi from '@/apis/user'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<User>()
  const isMenuInit = ref(false)
  const roles = computed(() => userInfo.value?.roles ?? [])
  const getUserInfo = async () => {
    const result = await userApi.getUserInfo()
    userInfo.value = result.data.data
  }

  const changeMenuInitStatus = (status: boolean) => {
    isMenuInit.value = status
  }

  return { userInfo, getUserInfo, roles, isMenuInit, changeMenuInitStatus }
})
