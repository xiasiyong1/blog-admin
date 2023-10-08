<template>
  <el-form :model="form" label-width="120px" :disabled="!canEditable">
    <el-form-item label="头像">
      <el-upload
        class="avatar-uploader"
        :action="imageUploadUrl"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
      >
        <img :src="avatar" class="w-[178px] h-[178px] object-cover" />
      </el-upload>
    </el-form-item>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email" disabled />
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <el-select v-model="form.gender">
        <el-option label="男" :value="1" />
        <el-option label="女" :value="2" />
        <el-option label="未知" :value="3" />
      </el-select>
    </el-form-item>
    <el-form-item label="角色">
      <el-select v-model="form.roleIds" multiple>
        <el-option :label="role.name" v-for="role in roles" :key="role.id" :value="role.id" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">更新</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ElMessage, type UploadProps } from 'element-plus'
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import * as userApi from '@/apis/user'
import * as roleApi from '@/apis/role'
import type { Role } from '@/types/role'
import type { User } from '@/types/user'
import type { GenderEnum } from '@/enums/gender'
import { getDefaultAvatar } from '@/helpers/avatar'
const imageUploadUrl = import.meta.env.VITE_IMAGE_UPLOAD_URL

const canEditable = ref(true)
const route = useRoute()
const roles = ref<Role[]>([])

// do not use same name with ref
const form = reactive<{
  avatar: string
  username: string
  gender: GenderEnum
  email: string
  roleIds: number[]
}>({
  avatar: '',
  username: '',
  gender: 3,
  email: '',
  roleIds: []
})

const avatar = computed(() => {
  return form.avatar
    ? `${import.meta.env.VITE_IMAGE_PREVIEW_PREFIX}${form.avatar}`
    : getDefaultAvatar(form.gender)
})

const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  form.avatar = response.data
}

const onSubmit = () => {
  userApi.updateUserInfoById(route.params.id as string, form).then((res) => {
    ElMessage.success('更新成功')
    console.log(res)
  })
}

const getUserInfoById = () => {
  const userId = route.params.id
  if (userId) {
    userApi.getUserInfoById(userId as string).then((res) => {
      const userInfo = res.data.data
      form.avatar = userInfo.avatar
      form.username = userInfo.username
      form.gender = userInfo.gender
      form.email = userInfo.email
      form.roleIds = userInfo.roles.map((role) => role.id)
    })
  }
}
const getRoles = () => {
  roleApi.findRoles().then((res) => {
    roles.value = res.data.data
  })
}

onMounted(() => {
  getUserInfoById()
  getRoles()
})
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
