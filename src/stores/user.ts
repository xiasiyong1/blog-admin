import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types/user'
import * as userApi from '@/apis/user'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<User>()
  const roles = computed(() => userInfo.value?.roles ?? [])
  const getUserInfo = () => {
    userApi.getUserInfo().then((res) => {
      userInfo.value = res.data.data
    })
  }

  return { userInfo, getUserInfo, roles }
})
