<template>
  <div>
    <el-form :model="form" label-width="120px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="用户名">
            <el-input v-model="form.username" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="邮箱"> <el-input v-model="form.email" /> </el-form-item
        ></el-col>
        <el-col :span="6">
          <el-form-item label="性别">
            <el-select v-model="form.gender" placeholder="请选择">
              <el-option label="未知" value="3" />
              <el-option label="男" value="1" />
              <el-option label="女" value="2" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="角色">
        <el-select multiple v-model="form.roles" placeholder="请选择">
          <el-option :label="role.name" :value="role.id" v-for="role in roles" :key="role.id" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button type="success" @click="showInviteDialog">邀请</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="userList" border stripe style="width: 100%">
      <el-table-column prop="id" label="id" width="180">
        <template #default="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="180">
        <template #default="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="email" label="邮箱" width="180">
        <template #default="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="gender" label="性别">
        <template #default="scope">
          <span>{{ getGenderText(scope.row.gender) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="avatar" label="头像">
        <template #default="scope">
          <span>{{ scope.row.profile?.avatar }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="roles" label="角色">
        <template #default="scope">
          <el-space>
            <el-tag v-for="role in scope.row.roles" :key="role.id">{{ role.name }}</el-tag>
          </el-space>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button-group>
            <el-button text type="primary" size="small">
              <router-link :to="`/home/user/detail/${scope.row.id}`">用户信息</router-link>
            </el-button>
            <el-popconfirm
              title="确定要删除吗?"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="deleteUser(scope.row.id)"
            >
              <template #reference>
                <el-button text type="danger" size="small">删除用户</el-button>
              </template>
            </el-popconfirm>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      small
      background
      layout="prev, pager, next"
      :total="total"
      v-model:current-page="form.currentPage"
      class="mt-4"
    />
    <ElDialog title="邀请用户" v-model="inviteDialogVisible">
      <ElForm ref="formRef" :model="inviteFrom" :rules="rules">
        <ElFormItem label="邮箱" prop="email">
          <ElInput placeholder="请输入邮箱" v-model="inviteFrom.email" />
        </ElFormItem>
        <ElFormItem label="角色" prop="roleId">
          <ElSelect placeholder="请选择" v-model="inviteFrom.roleId">
            <ElOption :label="role.name" :value="role.id" v-for="role in roles" :key="role.id" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem>
          <ElButton @click="hideInviteDialog">取消</ElButton>
          <ElButton type="primary" @click="inviteUser(formRef)">确认</ElButton>
        </ElFormItem>
      </ElForm>
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
import * as userApi from '@/apis/user/'
import * as roleApi from '@/apis/role/'
import * as authApi from '@/apis/auth/'
import { onMounted, reactive, ref } from 'vue'
import { GENDER_CONFIG } from '@/config/gender'
import { GenderEnum } from '@/enums/gender'
import type { GetUserList, User } from '@/types/user'
import type { Role } from '@/types/role'
import { ElDialog, ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
const EMAIL_REG = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/

const total = ref(0)
const roles = ref<Role[]>()

interface InviteForm {
  email: string
  roleId: number | undefined
}

const inviteFrom = ref<InviteForm>({
  email: '',
  roleId: undefined
})
const formRef = ref<FormInstance>()

const validateEmail = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入邮箱'))
  } else if (!EMAIL_REG.test(value)) {
    callback(new Error('请输入正确的邮箱'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<InviteForm>>({
  email: [{ required: true, validator: validateEmail }],
  roleId: [
    {
      required: true,
      message: '请选择角色',
      trigger: 'change'
    }
  ]
})

const form = reactive({
  username: '',
  gender: undefined,
  roles: [],
  email: '',
  currentPage: 1,
  pageSize: 10
})

const inviteUser = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      authApi
        .sendInviteEmail({
          email: inviteFrom.value.email,
          roleId: inviteFrom.value.roleId as number
        })
        .then((res) => {
          console.log(res)
          ElMessage.success('邀请成功')
          hideInviteDialog()
        })
      console.log('submit!')
    }
  })
}

const getGenderText = (gender: GenderEnum) => {
  return GENDER_CONFIG[gender || GenderEnum.UN_KNOWN]
}

const search = () => {
  getUserList(form)
}

const deleteUser = (id) => {
  userApi.deleteUserById(id).then(() => {
    ElMessage.success('删除成功')
    getUserList(form)
  })
}

const userList = ref<User[]>([])

const getUserList = (params: GetUserList) => {
  userApi.findUsers(params).then((res) => {
    userList.value = res.data.data.userList
    total.value = res.data.data.count
  })
}
const getRoles = () => {
  roleApi.findRoles().then((res) => {
    roles.value = res.data.data
  })
}
const inviteDialogVisible = ref(false)

const showInviteDialog = () => {
  inviteDialogVisible.value = true
}
const hideInviteDialog = () => {
  inviteDialogVisible.value = false
}

onMounted(() => {
  getUserList({
    currentPage: form.currentPage,
    pageSize: form.pageSize
  })
  getRoles()
})
</script>

<style></style>
